import { useEffect, useMemo, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

type Props = {
  start: [number, number];
  end: [number, number];
  progress: number;
  eta: number;
  type: "fire" | "ambulance" | "police";
};

const vehicleIcons = {
  fire: "🚒",
  ambulance: "🚑",
  police: "🚓",
};

const vehicleLabels = {
  fire: "Fire Engine",
  ambulance: "Ambulance",
  police: "Police Unit",
};

export default function AnimatedVehicle({
  start,
  end,
  progress,
  eta,
  type,
}: Props) {
  const [position, setPosition] =
    useState<[number, number]>(start);

  useEffect(() => {
    const lat =
      start[0] +
      ((end[0] - start[0]) * progress) / 100;

    const lng =
      start[1] +
      ((end[1] - start[1]) * progress) / 100;

    setPosition([lat, lng]);
  }, [start, end, progress]);

  const icon = useMemo(
    () =>
      L.divIcon({
        html: `
          <div
            style="
              font-size:32px;
              transform:translate(-50%,-50%);
              filter:drop-shadow(0 0 6px rgba(0,0,0,.35));
            "
          >
            ${vehicleIcons[type]}
          </div>
        `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      }),
    [type]
  );

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <div className="space-y-1">
          <div>
            <strong>{vehicleLabels[type]}</strong>
          </div>

          <div>ETA: {eta} min</div>

          <div>Progress: {progress}%</div>

          <div>
            Status:{" "}
            {progress >= 100
              ? "Arrived"
              : "En Route"}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}