import Spinner from "../../ui/Spinner";
import RoomRow from "./RoomRow";
import useRooms from "./useRooms";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function RoomTable() {
  const { isLoading, rooms } = useRooms();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Phòng</div>
          <div>Sức chứa</div>
          <div>Giá</div>
          <div>Giảm</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={rooms}
          render={(room) => <RoomRow room={room} key={room.id} />}
        />
      </Table>
    </Menus>
  );
}

export default RoomTable;
