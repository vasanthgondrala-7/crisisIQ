import {
  FIRE_STATIONS,
  HOSPITALS,
  AMBULANCES,
  POLICE_STATIONS,
} from "../data/emergencyResources";

type Resource = {
  id: number;
  name: string;
  position: [number, number];
};

function distance(
  a: [number, number],
  b: [number, number]
) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];

  return Math.sqrt(dx * dx + dy * dy);
}

function nearest(
  incident: [number, number],
  resources: Resource[]
) {
  return resources.reduce((closest, current) =>
    distance(current.position, incident) <
    distance(closest.position, incident)
      ? current
      : closest
  );
}

export function getDispatchRecommendation(
  incident: [number, number]
) {
  return {
    fire: nearest(incident, FIRE_STATIONS),
    ambulance: nearest(incident, AMBULANCES),
    hospital: nearest(incident, HOSPITALS),
    police: nearest(incident, POLICE_STATIONS),

    eta: {
      fire: 5,
      ambulance: 7,
      police: 8,
    },
  };
}