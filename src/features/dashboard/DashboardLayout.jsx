import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { stays, confirmStays, isLoading: isLoading2 } = useRecentStays();

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Thống kê</div>
      <div>Hoạt động hôm nay</div>
      <div>Chart stay durations</div>
      <div>Biểu đồ doanh thu</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
