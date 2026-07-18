export type VehicleType =
  | "fire"
  | "ambulance"
  | "police";

export interface DispatchVehicle {
  id: string;

  type: VehicleType;

  name: string;

  eta: number;

  progress: number;

  moving: boolean;

  arrived: boolean;
}