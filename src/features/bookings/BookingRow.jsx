/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { vi } from "date-fns/locale";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    Customers: { fullName: customerName, email },
    Rooms: { name: roomName },
  },
}) {
  const navigate = useNavigate();

  const statusToTagName = {
    "Chưa xác nhận": "blue",
    "Đã nhận phòng": "green",
    "Đã trả phòng": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{roomName}</Cabin>

      <Stacked>
        <span>{customerName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Hôm nay"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; Ở trong {numNights} đêm
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy", { locale: vi })} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy", { locale: vi })}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            Chi tiết
          </Menus.Button>
          {status === "Chưa xác nhận" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Nhận phòng
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
