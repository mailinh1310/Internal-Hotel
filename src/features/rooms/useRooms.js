import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

function useRooms() {
  // useQuery
  const {
    isLoading,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  return { isLoading, error, rooms };
}

export default useRooms;
