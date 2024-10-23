import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteRoom as deleteRoomApi } from "../../services/apiRooms";

function useDeleteRoom() {
  // Use useQueryClient() for invalidateQueries()
  const queryClient = useQueryClient();

  // Use useMutation() to delete
  const { isLoading: isDeleting, mutate: deleteRoom } = useMutation({
    mutationFn: (id) => deleteRoomApi(id),
    onSuccess: () => {
      toast.success("Đã xoá phòng thành công");

      // Use invalidateQueries to update data
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteRoom };
}

export default useDeleteRoom;
