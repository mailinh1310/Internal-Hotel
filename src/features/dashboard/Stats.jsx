import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

/* eslint-disable react/prop-types */
function Stats({ bookings, confirmedStays, numDays, roomCount }) {
  // 1. đơn đặt
  const numBookings = bookings.length;

  // 2. doanh thu
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. nhận phòng
  const checkins = confirmedStays.length;

  // 4. tỉ lệ lấp đầy
  // số đêm được dùng / tổng số đêm sẵn phòng
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * roomCount);

  return (
    <>
      <Stat
        title="Đơn đặt"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Doanh thu"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Nhận phòng"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkins}
      />
      <Stat
        title="Tỉ lệ hết phòng"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
