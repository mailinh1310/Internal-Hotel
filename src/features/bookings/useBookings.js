import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  let filterValue = searchParams.get("status");

  if (filterValue === "checked-out") filterValue = "Đã trả phòng";
  if (filterValue === "checked-in") filterValue = "Đã nhận phòng";
  if (filterValue === "unconfirmed") filterValue = "Chưa xác nhận";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, error, bookings };
}

export default useBookings;
