import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "7 ngày gần đây" },
        { value: "30", label: "30 ngày gần đây" },
        { value: "90", label: "90 ngày gần đây" },
      ]}
    />
  );
}

export default DashboardFilter;
