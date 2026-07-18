import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { incidents as mockIncidents } from "../data/dashboard";

export type IncidentStatus =
  | "Pending"
  | "Dispatched"
  | "En Route"
  | "On Scene"
  | "Resolved";

export type Incident = {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number];
  type: string;
  severity: string;
  description: string;
  priority: number;
  confidence: number;
  resources: string[];
  reason: string;
  time: string;
  status: IncidentStatus;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  type:
    | "critical"
    | "ai"
    | "dispatch"
    | "medical"
    | "traffic";
};

type IncidentContextType = {
  incidents: Incident[];

  selectedIncident: Incident;

  activities: Activity[];

  addIncident: (
    incident: Incident
  ) => void;

  selectIncident: (
    incident: Incident
  ) => void;

  updateIncidentStatus: (
    id: string,
    status: IncidentStatus
  ) => void;

  addActivity: (
    title: string,
    description: string,
    type: Activity["type"]
  ) => void;
};

const IncidentContext =
  createContext<
    IncidentContextType | undefined
  >(undefined);

export function IncidentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const initialIncidents =
    mockIncidents as Incident[];

  const [incidents, setIncidents] =
    useState<Incident[]>(initialIncidents);

  const [selectedIncident, setSelectedIncident] =
    useState<Incident>(
      initialIncidents[0]
    );

  const [activities, setActivities] =
    useState<Activity[]>([]);

    const addActivity = (
    title: string,
    description: string,
    type: Activity["type"]
  ) => {
    const activity: Activity = {
      id: crypto.randomUUID(),
      title,
      description,
      time: "Just now",
      type,
    };

    setActivities((prev) => [activity, ...prev]);
  };

  const addIncident = (incident: Incident) => {
    setIncidents((prev) => [incident, ...prev]);

    setSelectedIncident(incident);

    addActivity(
      "Incident Reported",
      incident.title,
      incident.severity === "Critical"
        ? "critical"
        : incident.type === "Medical"
        ? "medical"
        : incident.type === "Traffic"
        ? "traffic"
        : "dispatch"
    );

    addActivity(
      "AI Analysis Completed",
      `Priority ${incident.priority} • ${incident.confidence}% confidence`,
      "ai"
    );

    addActivity(
      "Dispatcher Notified",
      incident.location,
      "dispatch"
    );
  };

  const updateIncidentStatus = (
  id: string,
  status: IncidentStatus
) => {
  setIncidents((prev) =>
    prev.map((incident) =>
      incident.id === id
        ? {
            ...incident,
            status,
          }
        : incident
    )
  );

  setSelectedIncident((prev) =>
    prev.id === id
      ? {
          ...prev,
          status,
        }
      : prev
  );

  switch (status) {
    case "Dispatched":
      addActivity(
        "Fire Brigade Dispatched",
        "Emergency teams have been dispatched.",
        "dispatch"
      );

      addActivity(
        "Ambulance Dispatched",
        "Medical response unit dispatched.",
        "medical"
      );

      addActivity(
        "Police Unit Dispatched",
        "Police assigned for traffic and security.",
        "traffic"
      );
      break;

    case "En Route":
      addActivity(
        "Emergency Teams En Route",
        "Response units are travelling to the incident.",
        "dispatch"
      );
      break;

    case "On Scene":
      addActivity(
        "Teams Arrived On Scene",
        "Emergency responders have reached the incident.",
        "medical"
      );
      break;

    case "Resolved":
      addActivity(
        "Incident Resolved",
        "Emergency response completed successfully.",
        "ai"
      );
      break;
  }
};

    const selectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        selectedIncident,
        activities,
        addIncident,
        selectIncident,
        updateIncidentStatus,
        addActivity,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidents() {
  const context = useContext(IncidentContext);

  if (!context) {
    throw new Error(
      "useIncidents must be used inside IncidentProvider"
    );
  }

  return context;
}