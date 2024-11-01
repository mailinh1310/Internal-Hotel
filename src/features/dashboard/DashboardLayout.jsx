import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
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
