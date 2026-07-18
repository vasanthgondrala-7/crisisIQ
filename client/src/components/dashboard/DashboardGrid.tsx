import IncidentQueue from "./IncidentQueue";
import AIPanel from "./AIPanel";
import ResourceStatus from "./ResourceStatus";
import EmergencyMap from "../map/EmergencyMap";
import DispatchRecommendation from "./DispatchRecommendation";
import { getDispatchRecommendation } from "../../utils/dispatchEngine";
import { getIncidentPosition } from "../../data/locations";
import AICommander from "../ai/AICommander";
import MissionTimeline from "../timeline/MissionTimeline";

import {
  Incident,
  useIncidents,
} from "../../context/IncidentContext";

function DashboardGrid() {
  const {
    incidents,
    selectedIncident,
    selectIncident,
  } = useIncidents();

  const handleSelect = (incident: Incident) => {
    selectIncident(incident);
  };

  const incidentPosition = getIncidentPosition(selectedIncident);

  const recommendation = getDispatchRecommendation(incidentPosition);

  return (
    <>
      <div className="grid grid-cols-2 items-start gap-5">

        {/* LEFT */}

        <div className="flex flex-col gap-5 self-start">

          <IncidentQueue
            incidents={incidents}
            selectedId={selectedIncident.id}
            onSelect={handleSelect}
          />

          <MissionTimeline />

          <AICommander />

        </div>

        {/* RIGHT */}

        <div className="flex flex-col gap-5 self-start">

          <EmergencyMap />
          <AIPanel
            incident={selectedIncident}
          />

          <DispatchRecommendation
            recommendation={recommendation}
          />

          <ResourceStatus />

        </div>

      </div>

    </>
  );
}

export default DashboardGrid;