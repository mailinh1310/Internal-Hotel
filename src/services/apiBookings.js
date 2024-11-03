/* eslint-disable no-unused-vars */
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("Bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, Rooms(name), Customers(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query.eq(filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Không tải được thông tin đặt phòng");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Rooms(*), Customers(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Không tìm thấy phòng");
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Không tải được đơn đặt phòng");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    // .select('*')
    .select("*, Customers(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Không tải được đơn đặt phòng");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const today = getToday();
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Customers(fullName, nationality, countryFlag)")
    .or(`and(status.eq."Chưa xác nhận"),and(status.eq."Đã nhận phòng")`)
    .order("created_at");

  if (error) {
    console.error("Error fetching stays activity:", error);
    return null;
  }
  console.log(data);

  // Lọc dữ liệu dựa trên startDate và endDate
  const filteredData = data.filter((booking) => {
    const startDate = booking.startDate
      ? booking.startDate.split("T")[0]
      : null;
    const endDate = booking.endDate ? booking.endDate.split("T")[0] : null;

    console.log(startDate);
    return (
      (booking.status === "Chưa xác nhận" && startDate === today) ||
      (booking.status === "Đã nhận phòng" && endDate === today)
    );
  });

  console.log(filteredData);
  return filteredData;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
