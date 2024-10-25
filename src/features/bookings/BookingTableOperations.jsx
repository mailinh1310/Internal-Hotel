import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "Tất cả đơn" },
          { value: "checked-out", label: "Đã trả phòng" },
          { value: "checked-in", label: "Đã nhận phòng" },
          { value: "unconfirmed", label: "Chưa xác nhận" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "startDate-desc",
            label: "Sắp xếp theo thời gian (từ xa nhất)",
          },
          {
            value: "startDate-asc",
            label: "Sắp xếp theo thời gian (từ gần nhất)",
          },
          {
            value: "totalPrice-desc",
            label: "Sắp xếp theo tổng tiền (từ cao nhất)",
          },
          {
            value: "totalPrice-asc",
            label: "Sắp xếp theo tổng tiền (từ thấp nhất)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
