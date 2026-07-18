export const LOCATION_COORDINATES: Record<string, [number, number]> = {
  Hyderabad: [17.385, 78.4867],
  Secunderabad: [17.4399, 78.4983],
  Bangalore: [12.9716, 77.5946],
  Bengaluru: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Mumbai: [19.076, 72.8777],
  Delhi: [28.6139, 77.209],
  "New Delhi": [28.6139, 77.209],
  Kerala: [10.8505, 76.2711],
  Kochi: [9.9312, 76.2673],
  Pune: [18.5204, 73.8567],
  Visakhapatnam: [17.6868, 83.2185],
  Vijayawada: [16.5062, 80.648],
  Kolkata: [22.5726, 88.3639],
  Ahmedabad: [23.0225, 72.5714],
  Jaipur: [26.9124, 75.7873],
  Lucknow: [26.8467, 80.9462],
  Chandigarh: [30.7333, 76.7794],
  Indore: [22.7196, 75.8577],
  Bhopal: [23.2599, 77.4126],
  Surat: [21.1702, 72.8311],
  Nagpur: [21.1458, 79.0882],
  Coimbatore: [11.0168, 76.9558],
  Madurai: [9.9252, 78.1198],
  Mysore: [12.2958, 76.6394],
  Mysuru: [12.2958, 76.6394],
  Warangal: [17.9689, 79.5941],
  Guntur: [16.3067, 80.4365],
  Tirupati: [13.6288, 79.4192],
};

const LOCATION_ALIASES: Record<string, string> = {
  hyd: "Hyderabad",
  hydrabad: "Hyderabad",
  "cyberabad": "Hyderabad",
  blr: "Bangalore",
  bangalore: "Bangalore",
  bengaluru: "Bengaluru",
  bom: "Mumbai",
  bombay: "Mumbai",
  madras: "Chennai",
  calcutta: "Kolkata",
  vizag: "Visakhapatnam",
  "visiakhapatnam": "Visakhapatnam",
  cochin: "Kochi",
  "new delhi": "Delhi",
  ncr: "Delhi",
};

export const LOCATION_OPTIONS = Object.keys(LOCATION_COORDINATES).sort((a, b) =>
  a.localeCompare(b)
);

const INDIA_CENTER: [number, number] = [20.5937, 78.9629];

function normalizeLocationKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function resolveLocationName(rawLocation: string): string {
  const normalized = normalizeLocationKey(rawLocation);

  if (!normalized) return rawLocation;

  if (LOCATION_ALIASES[normalized]) {
    return LOCATION_ALIASES[normalized];
  }

  const exact = Object.keys(LOCATION_COORDINATES).find(
    (city) => normalizeLocationKey(city) === normalized
  );

  if (exact) return exact;

  const contained = Object.keys(LOCATION_COORDINATES).find((city) => {
    const cityKey = normalizeLocationKey(city);
    return normalized.includes(cityKey) || cityKey.includes(normalized);
  });

  if (contained) return contained;

  const aliasHit = Object.entries(LOCATION_ALIASES).find(([alias]) =>
    normalized.includes(alias)
  );

  if (aliasHit) return aliasHit[1];

  return rawLocation.trim();
}

export function resolveLocationCoordinates(
  rawLocation: string
): [number, number] {
  const resolvedName = resolveLocationName(rawLocation);
  const direct = LOCATION_COORDINATES[resolvedName];

  if (direct) return direct;

  const fuzzy = Object.entries(LOCATION_COORDINATES).find(([city]) =>
    normalizeLocationKey(rawLocation).includes(normalizeLocationKey(city))
  );

  return fuzzy?.[1] ?? INDIA_CENTER;
}

export function getIncidentPosition(incident: {
  location: string;
  coordinates?: [number, number];
}): [number, number] {
  if (incident.coordinates) {
    return incident.coordinates;
  }

  return resolveLocationCoordinates(incident.location);
}
