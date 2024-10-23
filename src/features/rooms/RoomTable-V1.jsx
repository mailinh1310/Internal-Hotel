import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getRooms } from "../../services/apiRooms";
import Spinner from "../../ui/Spinner";
import RoomRow from "./RoomRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  /* 6 columns */
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function RoomTable() {
  // useQuery
  const {
    isLoading,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  if (isLoading) return <Spinner />;

  return (
    // Role for more accessible
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Phòng</div>
        <div>Sức chứa</div>
        <div>Giá</div>
        <div>Giảm</div>
        <div></div>
      </TableHeader>
      {rooms.map((room) => (
        <RoomRow room={room} key={room.id} />
      ))}
    </Table>
  );
}

export default RoomTable;
