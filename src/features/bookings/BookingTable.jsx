import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="đặt phòng" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Phòng</div>
          <div>Khách hàng</div>
          <div>Thời gian</div>
          <div>Trạng thái</div>
          <div>Tổng tiền</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={bookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
