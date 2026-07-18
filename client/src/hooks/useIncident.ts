import { useState } from "react";
import { incidents } from "../data/dashboard";

export function useIncident() {
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);

  return {
    incidents,
    selectedIncident,
    setSelectedIncident
  };
}