import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { DispatchVehicle } from "../shared/types/dispatch";

type DispatchSimulation = {
  vehicles: DispatchVehicle[];

  running: boolean;

  completed: boolean;
};

type DispatchSimulationContextType = {
  simulation: DispatchSimulation;
  startSimulation: () => void;
  stopSimulation: () => void;
};

const DispatchSimulationContext = createContext<
  DispatchSimulationContextType | undefined
>(undefined);

export function DispatchSimulationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [simulation, setSimulation] =
    useState<DispatchSimulation>({
      vehicles: [],

      running: false,

    completed: false,
    });

  const startSimulation = () => {
    setSimulation({
      running: true,

    completed: false,

      vehicles: [
        {
          id: crypto.randomUUID(),
          type: "fire",
          name: "Fire Engine 12",
          eta: 15,
          progress: 0,
          moving: true,
          arrived: false,
        },
        {
          id: crypto.randomUUID(),
          type: "ambulance",
          name: "Ambulance A21",
          eta: 15,
          progress: 0,
          moving: true,
          arrived: false,
        },
        {
          id: crypto.randomUUID(),
          type: "police",
          name: "Police Unit P4",
          eta: 15,
          progress: 0,
          moving: true,
          arrived: false,
        },
      ],
    });
  };

  const stopSimulation = () => {
    setSimulation({
      vehicles: [],

      running: false,

    completed: true,
    });
  };

  useEffect(() => {
    if (simulation.vehicles.length === 0) return;

    const interval = setInterval(() => {
      setSimulation((prev) => ({
  ...prev,

  vehicles: prev.vehicles.map((vehicle) => {
    if (vehicle.arrived) {
      return vehicle;
    }

    const speed =
      100 / Math.max(vehicle.eta, 1);

    const progress = Math.min(
      vehicle.progress + speed,
      100
    );

    return {
      ...vehicle,

      eta: Math.max(vehicle.eta - 1, 0),

      progress,

      arrived: progress >= 100,

      moving: progress < 100,
    };
  }),
}));
    }, 1000);

    return () => clearInterval(interval);
  }, [simulation.vehicles.length]);

  useEffect(() => {
    if (simulation.vehicles.length === 0) return;

    const allArrived = simulation.vehicles.every(
      (vehicle) => vehicle.arrived
    );

    if (!allArrived) return;

    const timeout = setTimeout(() => {
      stopSimulation();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [simulation]);

  return (
    <DispatchSimulationContext.Provider
      value={{
        simulation,
        startSimulation,
        stopSimulation,
      }}
    >
      {children}
    </DispatchSimulationContext.Provider>
  );
}

export function useDispatchSimulation() {
  const context = useContext(
    DispatchSimulationContext
  );

  if (!context) {
    throw new Error(
      "useDispatchSimulation must be used inside DispatchSimulationProvider"
    );
  }

  return context;
}