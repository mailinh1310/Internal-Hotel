import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateRoomForm from "./CreateRoomForm";

function AddRoom() {
  return (
    <Modal>
      <Modal.Open opens="room-form">
        <Button>Thêm phòng</Button>
      </Modal.Open>
      <Modal.Window name="room-form">
        <CreateRoomForm />
      </Modal.Window>

      <Modal.Open>
        <Button>Xem bảng phòng</Button>
      </Modal.Open>
      <Modal.Window>
        <CreateRoomForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddRoom() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((s) => !s)}>Thêm phòng mới</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateRoomForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddRoom;
