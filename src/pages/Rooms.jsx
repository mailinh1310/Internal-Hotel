import RoomTable from "../features/rooms/RoomTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tất cả phòng</Heading>
        <p>Lọc / Sắp xếp</p>
      </Row>
      <Row>
        <RoomTable />
      </Row>
    </>
  );
}

export default Rooms;
