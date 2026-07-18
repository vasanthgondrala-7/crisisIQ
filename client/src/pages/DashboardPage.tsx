import { useState } from "react";
import { Plus } from "lucide-react";

import StatsGrid from "../components/dashboard/StatsGrid";
import DashboardGrid from "../components/dashboard/DashboardGrid";
import IncidentModal from "../components/modal/IncidentModal";

function DashboardPage() {
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);

  return (
    <>
      <section className="flex h-full flex-col">
        {/* Header */}

        <div className="mb-3 flex items-start justify-between">
          <div>
            <h1 className="text-[25px] font-bold tracking-tight text-white">
              Emergency Operations Center
            </h1>

            <p className="mt-1 text-[15px] text-slate-400">
              AI Decision Support for Disaster & Emergency Response
            </p>
          </div>

          <button
            onClick={() => setIsIncidentModalOpen(true)}
            className="
              flex
              h-11
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              text-[14px]
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition-all
              duration-300
              hover:bg-blue-700
              hover:shadow-blue-600/40
            "
          >
            <Plus size={16} />
            <span>Report Incident</span>
          </button>
        </div>

        {/* KPI */}

        <div className="mb-3">
          <StatsGrid />
        </div>

        {/* Dashboard */}

        <DashboardGrid />
      </section>

      {/* Incident Modal */}

      <IncidentModal
        isOpen={isIncidentModalOpen}
        onClose={() => setIsIncidentModalOpen(false)}
      />
    </>
  );
}

export default DashboardPage;