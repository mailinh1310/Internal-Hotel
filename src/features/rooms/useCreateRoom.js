import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditRoom } from "../../services/apiRooms";

function useCreateRoom() {
  // useQueryClient() for updating
  const queryClient = useQueryClient();

  // use mutate và isLoading từ useMutation()
  const { mutate: createRoom, isLoading: isCreating } = useMutation({
    mutationFn: createEditRoom,
    onSuccess: () => {
      toast.success("Phòng mới đã được thêm thành công");
      // update data
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createRoom };
}

export default useCreateRoom;
