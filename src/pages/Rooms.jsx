import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getRooms } from "../services/apiRooms";

function Rooms() {
  useEffect(function () {
    getRooms().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All rooms</Heading>
      {/* <p>TEST</p> */}
    </Row>
  );
}

export default Rooms;
