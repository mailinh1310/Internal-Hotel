import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function RoomTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "Tất cả phòng" },
          { value: "no-discount", label: "Không giảm giá" },
          { value: "with-discount", label: "Có giảm giá" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sắp xếp theo tên phòng (A-Z)" },
          { value: "name-desc", label: "Sắp xếp theo tên phòng (Z-A)" },
          {
            value: "regularPrice-asc",
            label: "Sắp xếp theo giá (từ thấp nhất)",
          },
          {
            value: "regularPrice-desc",
            label: "Sắp xếp theo giá (từ cao nhất)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sắp xếp theo sức chứa (từ thấp nhất)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sắp xếp theo sức chứa (từ cao nhất)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default RoomTableOperations;
