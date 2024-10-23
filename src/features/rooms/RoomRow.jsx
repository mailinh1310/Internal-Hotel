/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import useDeleteRoom from "./useDeleteRoom";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function RoomRow({ room }) {
  const [showForm, setShowForm] = useState(false);

  const { id: roomId, name, maxCapacity, regularPrice, discount, image } = room;

  const { isDeleting, deleteRoom } = useDeleteRoom();

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Room>{name}</Room>
        <div>Chứa tối đa {maxCapacity} khách</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <button onClick={() => setShowForm((s) => !s)}>Sửa</button>
          <button onClick={() => deleteRoom(roomId)} disabled={isDeleting}>
            Xoá
          </button>
        </div>
      </TableRow>
      {showForm && <CreateRoomForm roomToEdit={room} />}
    </>
  );
}

export default RoomRow;
