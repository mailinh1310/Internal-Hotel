import RoomTable from "../features/rooms/RoomTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddRoom from "../features/rooms/AddRoom";
import RoomTableOperations from "../features/rooms/RoomTableOperations";

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tất cả phòng</Heading>
        <RoomTableOperations />
      </Row>
      <Row>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  );
}

export default Rooms;
