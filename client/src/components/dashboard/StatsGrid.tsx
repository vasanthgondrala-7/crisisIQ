import StatCard from "./StatCard";

import { useIncidents } from "../../context/IncidentContext";
import { calculateDashboardStats } from "../../utils/dashboardAnalytics";

function StatsGrid() {
  const { incidents } = useIncidents();

  const dashboardStats = calculateDashboardStats(incidents);

  const stats = [
    {
      title: "Critical Incidents",
      value: dashboardStats.critical,
      change: "Live",
    },
    {
      title: "High Priority",
      value: dashboardStats.high,
      change: "Live",
    },
    {
      title: "Resources Active",
      value: dashboardStats.activeResources,
      change: "Dynamic",
    },
    {
      title: "Avg Response",
      value: dashboardStats.avgResponse,
      change: "AI Calculated",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          change={item.change}
        />
      ))}
    </section>
  );
}

export default StatsGrid;