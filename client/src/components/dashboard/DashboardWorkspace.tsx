
import IncidentQueue from "./IncidentQueue";
import AIPanel from "./AIPanel";
import { useIncident } from "../../hooks/useIncident";

function DashboardWorkspace() {
  const {
    incidents,
    selectedIncident,
    setSelectedIncident
  } = useIncident();

  return (
    <div className="grid grid-cols-2 gap-6">
      <IncidentQueue
        incidents={incidents}
        selectedId={selectedIncident.id}
        onSelect={setSelectedIncident}
      />

      <AIPanel
        incident={selectedIncident}
      />
    </div>
  );
}

export default DashboardWorkspace;

