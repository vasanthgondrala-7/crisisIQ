import { useState } from "react";
import { incidents } from "../data/dashboard";
import type { Incident } from "../context/IncidentContext";

export function useIncident() {
  const [selectedIncident, setSelectedIncident] = useState<Incident>(
    incidents[0] as Incident
  );

  return {
    incidents,
    selectedIncident,
    setSelectedIncident
  };
}