import { resolveLocationCoordinates } from "./locations";

export const stats = [
  {
    title: "Critical Incidents",
    value: 12,
    change: "+3 Today",
  },
  {
    title: "High Priority",
    value: 31,
    change: "+7 Today",
  },
  {
    title: "Resources Active",
    value: 18,
    change: "Available",
  },
  {
    title: "Avg Response",
    value: "4.2m",
    change: "Improved",
  },
];

export const incidents = [
  {
    id: crypto.randomUUID(),
    title: "Industrial Fire",
    location: "Hyderabad",
    coordinates: resolveLocationCoordinates("Hyderabad"),
    type: "Fire",
    severity: "Critical",
    description:
      "Major industrial fire with hazardous material involvement.",
    priority: 98,
    confidence: 97,
    resources: ["Fire Engine", "Ambulance", "Police Unit"],
    reason:
      "Multiple emergency calls indicate a rapidly spreading industrial fire with possible hazardous material involvement.",
    time: "2 mins ago",
    status: "Pending" as const,
  },
  {
    id: crypto.randomUUID(),
    title: "Flash Flood",
    location: "Kerala",
    coordinates: resolveLocationCoordinates("Kerala"),
    type: "Flood",
    severity: "High",
    description:
      "Heavy rainfall has caused flash flooding in low-lying areas.",
    priority: 91,
    confidence: 94,
    resources: ["Rescue Boat", "Medical Team"],
    reason:
      "Heavy rainfall and rising river levels indicate immediate evacuation may be required.",
    time: "5 mins ago",
    status: "Pending" as const,
  },
  {
    id: crypto.randomUUID(),
    title: "Road Accident",
    location: "Bangalore",
    coordinates: resolveLocationCoordinates("Bangalore"),
    type: "Traffic",
    severity: "Medium",
    description: "Multi-vehicle collision with possible injuries.",
    priority: 74,
    confidence: 92,
    resources: ["Ambulance", "Traffic Police"],
    reason:
      "Multiple vehicle collision causing traffic congestion with possible injuries.",
    time: "11 mins ago",
    status: "Pending" as const,
  },
];

export const timeline = [
  {
    id: crypto.randomUUID(),
    time: "16:22",
    type: "critical",
    title: "Industrial Fire Reported",
    description: "12 emergency calls received from Hyderabad.",
  },
  {
    id: crypto.randomUUID(),
    time: "16:24",
    type: "ai",
    title: "AI Analysis Completed",
    description: "Priority score generated with 97% confidence.",
  },
  {
    id: crypto.randomUUID(),
    time: "16:25",
    type: "dispatch",
    title: "Fire Engine Dispatched",
    description: "Nearest available fire station assigned.",
  },
  {
    id: crypto.randomUUID(),
    time: "16:27",
    type: "medical",
    title: "Hospital Notified",
    description: "Emergency trauma team alerted.",
  },
  {
    id: crypto.randomUUID(),
    time: "16:29",
    type: "traffic",
    title: "Traffic Diverted",
    description: "Police rerouted nearby traffic.",
  },
];
