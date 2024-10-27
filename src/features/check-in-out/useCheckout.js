import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "Đã trả phòng",
      }),
    onSuccess: (data) => {
      toast.success(`Trả phòng đơn #${data.id} thành công`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("Có lỗi khi xử lý trả phòng"),
  });

  return { checkout, isCheckingOut };
}

export default useCheckout;
