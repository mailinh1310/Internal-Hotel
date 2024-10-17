import { useState } from "react";
import RoomTable from "../features/rooms/RoomTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateRoomForm from "../features/rooms/CreateRoomForm";

function Rooms() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tất cả phòng</Heading>
        <p>Lọc / Sắp xếp</p>
      </Row>
      <Row>
        <RoomTable />
        <Button onClick={() => setShowForm((s) => !s)}>Thêm phòng mới</Button>
        {showForm && <CreateRoomForm />}
      </Row>
    </>
  );
}

export default Rooms;
