import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "Đã nhận phòng",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Nhận phòng đơn #${data.id} thành công`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("Có lỗi khi xử lý nhận phòng"),
  });

  return { checkin, isCheckingIn };
}

export default useCheckin;
