import Filter from "../../ui/Filter";
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
    </TableOperations>
  );
}

export default RoomTableOperations;
