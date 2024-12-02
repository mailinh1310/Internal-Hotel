import { getSettings } from "./apiSettings";
import { getBookings } from "./apiBookings";
import openai from "./openai";

// Hàm trả lời câu hỏi từ OpenAI
export const getAnswerFromOpenAI = async (roomsData, question) => {
  // Lấy dữ liệu Settings từ Supabase
  const settingsData = await getSettings();

  // Lấy dữ liệu Bookings từ Supabase
  const bookingsData = await getBookings({}); // Có thể thêm filter nếu cần
  const bookingsInfo = bookingsData.data
    .map(
      (booking) => `
    - **Khách hàng**: ${booking.Customers.fullName || "Không có tên"} (${
        booking.Customers.email || "Không có email"
      })
    - **Phòng**: ${booking.Rooms.name || "Không có tên phòng"}
    - **Ngày bắt đầu**: ${booking.startDate || "Không có thông tin"}
    - **Ngày kết thúc**: ${booking.endDate || "Không có thông tin"}
    - **Số đêm**: ${booking.numNights || 0}
    - **Số khách**: ${booking.numGuests || 0}
    - **Tổng giá**: ${booking.totalPrice || 0} $
    - **Trạng thái**: ${booking.status || "Chưa cập nhật"}
  `
    )
    .join("\n");

  const settingsInfo = `
    - **Khoảng thời gian đặt phòng tối thiểu**: ${
      settingsData.minBookingLength || "Không có thông tin"
    }
    - **Khoảng thời gian đặt phòng tối đa**: ${
      settingsData.maxBookingLength || "Không có thông tin"
    }
    - **Số khách tối đa mỗi đặt phòng**: ${
      settingsData.maxGuestsPerBooking || "Không có thông tin"
    }
    - **Giá bữa sáng**: ${settingsData.breakfastPrice || "Không có thông tin"}
  `;

  const roomInfo = roomsData
    .map(
      (room) => `
    - **Tên phòng**: ${room.name || "Chưa có tên"}
    - **Sức chứa tối đa**: ${room.maxCapacity || "Chưa có thông tin"}
    - **Giá thường**: ${room.regularPrice || 0} $
    - **Giảm giá**: ${room.discount || "Không giảm giá"}
    - **Mô tả**: ${room.description || "Chưa có mô tả"}
  `
    )
    .join("\n");

  // Lấy ngày hiện tại
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const prompt = `
    Hôm nay là ${today}.

    Đây là thông tin về các phòng của khách sạn:
    ${roomInfo}

    Thông tin đặt phòng:
    ${bookingsInfo}

    Thông tin bổ sung:
    ${settingsInfo}

    Thông tin thanh toán: Thanh toán trực tiếp khi nhận phòng hoặc thanh toán online qua VNPay.

    Câu hỏi: ${question}

    Vui lòng trả lời câu hỏi trên một cách ngắn gọn và chuyên nghiệp. Nếu câu hỏi không liên quan, hãy tìm kiếm trên internet và hãy đề nghị nhân viên và nhà quản lý tìm hiểu thêm từ nguồn khác nếu cần. Trả lời dựa trên hội thoại trước đó. Tên khách sạn là Luxury Forest Hotel. Trả lời với vai trò tư vấn trong website quản lý đặt phòng khách sạn dành cho nhân viên và quản lý khách sạn.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Xin lỗi, chưa thể trả lời câu hỏi của bạn ngay bây giờ.";
  }
};
