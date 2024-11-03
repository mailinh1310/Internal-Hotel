/* eslint-disable react/prop-types */
import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 6rem 11rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, Customers, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "Chưa xác nhận" && <Tag type="green">Sắp đến</Tag>}
      {status === "Đã nhận phòng" && <Tag type="blue">Sắp rời</Tag>}

      <Flag
        src={Customers.countryFlag}
        // alt={`Cờ của ${Customers.countryFlag}`}
      />
      <Guest>{Customers.fullName}</Guest>
      <div>{numNights} đêm</div>
      {status === "Chưa xác nhận" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Nhận phòng
        </Button>
      )}

      {status === "Đã nhận phòng" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
