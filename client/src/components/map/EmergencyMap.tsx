import DispatchRoutes from "./DispatchRoutes";
import AnimatedVehicle from "./AnimatedVehicle";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useIncidents } from "../../context/IncidentContext";
import { useDispatchSimulation } from "../../context/DispatchSimulationContext";

import { getIncidentPosition } from "../../data/locations";

import {
  FIRE_STATIONS,
  HOSPITALS,
  POLICE_STATIONS,
  AMBULANCES,
} from "../../data/emergencyResources";

import { getDispatchRecommendation } from "../../utils/dispatchEngine";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FlyToIncident({
  position,
}: {
  position: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 12, {
      duration: 1.2,
    });
  }, [position[0], position[1], map]);

  return null;
}

function Legend() {
  return (
    <div className="absolute bottom-3 left-3 z-[400] rounded-lg bg-white p-3 shadow-lg">
      <div className="space-y-1 text-xs">
        <div>🔴 Incident</div>
        <div>🟠 Fire Station</div>
        <div>🟢 Hospital</div>
        <div>🔵 Ambulance</div>
        <div>🟣 Police</div>
        <div>🚒 Moving Fire Engine</div>
        <div>🚑 Moving Ambulance</div>
        <div>🚓 Moving Police</div>
      </div>
    </div>
  );
}

export default function EmergencyMap() {
  const { incidents, selectedIncident } = useIncidents();

  const { simulation } = useDispatchSimulation();

  const incidentPosition = getIncidentPosition(selectedIncident);

  const recommendation = getDispatchRecommendation(incidentPosition);

  const visibleIncidents = incidents.filter(
    (incident) => incident.status !== "Resolved"
  );

  return (
    <div className="relative z-0 isolate overflow-hidden rounded-xl border border-white/10 bg-[#111B2E]">
      <div className="border-b border-white/10 px-4 py-3">
        <h2 className="text-[18px] font-bold text-white">
          Live Emergency Map
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Tracking {selectedIncident.location} · {selectedIncident.title}
        </p>
      </div>

      <div className="relative z-0 isolate overflow-hidden">
        <MapContainer
          key={`${incidentPosition[0]}-${incidentPosition[1]}-${selectedIncident.id}`}
          center={incidentPosition}
          zoom={12}
          scrollWheelZoom
          className="h-[520px] w-full"
          style={{ zIndex: 0 }}
        >
          <FlyToIncident position={incidentPosition} />

          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {visibleIncidents.map((incident) => {
            const position = getIncidentPosition(incident);
            const isSelected = incident.id === selectedIncident.id;

            if (isSelected) {
              return (
                <Marker key={incident.id} position={position}>
                  <Popup>
                    <strong>{incident.title}</strong>
                    <br />
                    {incident.location}
                    <br />
                    Severity: {incident.severity}
                    <br />
                    Priority: {incident.priority}
                  </Popup>
                </Marker>
              );
            }

            return (
              <CircleMarker
                key={incident.id}
                center={position}
                radius={7}
                pathOptions={{
                  color: "#ef4444",
                  fillColor: "#ef4444",
                  fillOpacity: 0.85,
                }}
              >
                <Popup>
                  <strong>{incident.title}</strong>
                  <br />
                  {incident.location}
                </Popup>
              </CircleMarker>
            );
          })}

          {FIRE_STATIONS.map((station) => (
            <CircleMarker
              key={station.id}
              center={station.position}
              radius={8}
              pathOptions={{
                color: "#f97316",
                fillColor: "#f97316",
                fillOpacity: 1,
              }}
            >
              <Popup>{station.name}</Popup>
            </CircleMarker>
          ))}

          {HOSPITALS.map((hospital) => (
            <CircleMarker
              key={hospital.id}
              center={hospital.position}
              radius={8}
              pathOptions={{
                color: "#22c55e",
                fillColor: "#22c55e",
                fillOpacity: 1,
              }}
            >
              <Popup>{hospital.name}</Popup>
            </CircleMarker>
          ))}

          {AMBULANCES.map((ambulance) => (
            <CircleMarker
              key={ambulance.id}
              center={ambulance.position}
              radius={8}
              pathOptions={{
                color: "#3b82f6",
                fillColor: "#3b82f6",
                fillOpacity: 1,
              }}
            >
              <Popup>{ambulance.name}</Popup>
            </CircleMarker>
          ))}

          {POLICE_STATIONS.map((station) => (
            <CircleMarker
              key={station.id}
              center={station.position}
              radius={8}
              pathOptions={{
                color: "#a855f7",
                fillColor: "#a855f7",
                fillOpacity: 1,
              }}
            >
              <Popup>{station.name}</Popup>
            </CircleMarker>
          ))}

          <DispatchRoutes
            incident={incidentPosition}
            fire={recommendation.fire.position}
            ambulance={recommendation.ambulance.position}
            police={recommendation.police.position}
          />

          {simulation.vehicles.map((vehicle) => {
            let start: [number, number] | undefined;

            switch (vehicle.type) {
              case "fire":
                start = recommendation.fire.position;
                break;
              case "ambulance":
                start = recommendation.ambulance.position;
                break;
              case "police":
                start = recommendation.police.position;
                break;
            }

            return (
              <AnimatedVehicle
                key={vehicle.id}
                start={start}
                end={incidentPosition}
                progress={vehicle.progress}
                eta={vehicle.eta}
                type={vehicle.type}
              />
            );
          })}
        </MapContainer>

        <Legend />
      </div>
    </div>
  );
}