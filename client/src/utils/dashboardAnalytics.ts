import { Incident } from "../context/IncidentContext";

export function calculateDashboardStats(
  incidents: Incident[]
) {
  const critical = incidents.filter(
    (i) =>
      i.severity === "Critical" &&
      i.status !== "Resolved"
  ).length;

  const high = incidents.filter(
    (i) =>
      i.priority >= 80 &&
      i.status !== "Resolved"
  ).length;

  const activeResources = incidents.reduce(
    (count, incident) => {
      if (incident.status !== "Resolved") {
        return count + incident.resources.length;
      }
      return count;
    },
    0
  );

  const avgResponse = "3.8m";

  return {
    critical,
    high,
    activeResources,
    avgResponse,
  };
}