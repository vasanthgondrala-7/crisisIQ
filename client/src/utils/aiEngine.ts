import { IncidentFormData } from "../components/forms/IncidentForm";
import { Incident } from "../context/IncidentContext";
import {
  resolveLocationCoordinates,
  resolveLocationName,
} from "../data/locations";

const resourceMap: Record<string, string[]> = {
  Fire: ["Fire Brigade", "Ambulance", "Police"],
  Flood: ["Rescue Team", "Boat Unit", "Medical Team"],
  Earthquake: ["NDRF", "Medical Team", "Police"],
  Medical: ["Ambulance", "Medical Team"],
  Traffic: ["Police", "Ambulance", "Traffic Unit"],
};

const reasonMap: Record<string, string> = {
  Fire:
    "High fire risk detected. Immediate firefighting resources and medical support are recommended.",

  Flood:
    "Flood conditions may worsen quickly. Rescue teams should be dispatched immediately.",

  Earthquake:
    "Structural damage is likely. Search-and-rescue teams are recommended.",

  Medical:
    "Immediate medical attention is required. Dispatch the nearest ambulance.",

  Traffic:
    "Traffic congestion and possible injuries detected. Police and ambulance response recommended.",
};

const severityScore: Record<string, number> = {
  Low: 35,
  Medium: 55,
  High: 80,
  Critical: 95,
};

export function analyzeIncident(form: IncidentFormData): Incident {
  const priority =
    severityScore[form.severity] + Math.floor(Math.random() * 5);

  const confidence = 90 + Math.floor(Math.random() * 9);
  const location = resolveLocationName(form.location);
  const coordinates = resolveLocationCoordinates(form.location);

  return {
    id: crypto.randomUUID(),
    title: form.title,
    location,
    coordinates,
    type: form.type,
    severity: form.severity,
    description: form.description,
    priority,
    confidence,
    resources: resourceMap[form.type] ?? ["Emergency Team"],
    reason: reasonMap[form.type] ?? "AI recommends immediate assessment.",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "Pending",
  };
}
