import { useState } from "react";
import { X } from "lucide-react";

import IncidentForm, {
  IncidentFormData,
} from "../forms/IncidentForm";
import AIAnalysisLoader from "./AIAnalysisLoader";

import { analyzeIncident } from "../../utils/aiEngine";
import { useIncidents } from "../../context/IncidentContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import toast from "react-hot-toast";

type IncidentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function IncidentModal({
  isOpen,
  onClose,
}: IncidentModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { addIncident } = useIncidents();
  const { pushNotification } = useWorkspace();

  if (!isOpen) return null;

  const handleSubmit = (data: IncidentFormData) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const aiIncident = analyzeIncident(data);

      addIncident(aiIncident);

      pushNotification(
        "New Incident Reported",
        `${aiIncident.title} · ${aiIncident.location}`,
        "incident"
      );

      toast.success(
        `${aiIncident.severity} ${aiIncident.type} incident reported at ${aiIncident.location}`
      );

      setIsAnalyzing(false);

      onClose();
    }, 3000);
  };

  const handleClose = () => {
    setIsAnalyzing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative z-[10000] w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111B2E] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              Report New Incident
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Enter the incident details to begin AI analysis.
            </p>
          </div>

          {!isAnalyzing && (
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="p-6">
          {isAnalyzing ? (
            <AIAnalysisLoader />
          ) : (
            <IncidentForm onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}