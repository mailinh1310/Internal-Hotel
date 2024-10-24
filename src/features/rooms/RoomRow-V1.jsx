/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateRoomForm from "./CreateRoomForm";
import useDeleteRoom from "./useDeleteRoom";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import useCreateRoom from "./useCreateRoom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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
  const { isDeleting, deleteRoom } = useDeleteRoom();
  const { isCreating, createRoom } = useCreateRoom();

  const {
    id: roomId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = room;

  function handleDuplicate() {
    createRoom({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
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
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateRoomForm roomToEdit={room} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="phòng"
              disabled={isDeleting}
              onConfirm={() => deleteRoom(roomId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default RoomRow;
