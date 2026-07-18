import {
  Flame,
  Ambulance,
  Shield,
  Clock,
} from "lucide-react";

import DispatchProgressBar from "./DispatchProgressBar";
import DispatchStatusBadge from "./DispatchStatusBadge";

import { DispatchVehicle } from "../../shared/types/dispatch";

type Props = {
  vehicle: DispatchVehicle;
};

export default function DispatchVehicleCard({
  vehicle,
}: Props) {
  const getIcon = () => {
    switch (vehicle.type) {
      case "fire":
        return (
          <Flame
            size={20}
            className="text-orange-400"
          />
        );

      case "ambulance":
        return (
          <Ambulance
            size={20}
            className="text-green-400"
          />
        );

      case "police":
        return (
          <Shield
            size={20}
            className="text-blue-400"
          />
        );
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A] p-4">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-slate-800 p-2">
            {getIcon()}
          </div>

          <div>

            <h3 className="font-semibold text-white">
              {vehicle.name}
            </h3>

            <p className="text-xs text-slate-400 capitalize">
              {vehicle.type}
            </p>

          </div>

        </div>

        <DispatchStatusBadge
          arrived={vehicle.arrived}
          moving={vehicle.moving}
        />

      </div>

      <DispatchProgressBar
        progress={vehicle.progress}
      />

      <div className="mt-3 flex items-center justify-between text-sm">

        <div className="flex items-center gap-2 text-slate-300">

          <Clock size={16} />

          ETA

        </div>

        <div className="font-semibold text-white">

          {vehicle.eta} min

        </div>

      </div>

    </div>
  );
}