import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import RoomRow from "./RoomRow";
import useRooms from "./useRooms";
import Table from "../../ui/Table";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   /* 6 columns */
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function RoomTable() {
  const { isLoading, rooms } = useRooms();

  if (isLoading) return <Spinner />;

  return (
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
  );
}

export default RoomTable;
