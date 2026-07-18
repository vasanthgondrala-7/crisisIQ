import { Polyline } from "react-leaflet";

type Props = {
  incident: [number, number];

  fire: [number, number];

  ambulance: [number, number];

  police: [number, number];
};

export default function DispatchRoutes({
  incident,
  fire,
  ambulance,
  police,
}: Props) {
  return (
    <>
      {/* Fire */}

      <Polyline
        positions={[fire, incident]}
        pathOptions={{
          color: "#ef4444",
          weight: 4,
        }}
      />

      {/* Ambulance */}

      <Polyline
        positions={[ambulance, incident]}
        pathOptions={{
          color: "#22c55e",
          weight: 4,
        }}
      />

      {/* Police */}

      <Polyline
        positions={[police, incident]}
        pathOptions={{
          color: "#3b82f6",
          weight: 4,
        }}
      />
    </>
  );
}