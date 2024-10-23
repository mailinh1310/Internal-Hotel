import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

function useEditRoom() {
  const queryClient = useQueryClient();

  const { mutate: editRoom, isLoading: isEditing } = useMutation({
    mutationFn: ({ newRoomData, id }) => createEditRoom(newRoomData, id),
    onSuccess: () => {
      toast.success("Thông tin phòng đã được sửa thành công");
      // update data
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editRoom };
}

export default useEditRoom;
