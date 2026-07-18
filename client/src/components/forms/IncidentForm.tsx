import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LOCATION_OPTIONS } from "../../data/locations";

const incidentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  location: z.string().min(1, "Select a location"),
  type: z.string().min(1, "Select an incident type"),
  severity: z.string().min(1, "Select severity"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type IncidentFormData = z.infer<typeof incidentSchema>;

type Props = {
  onSubmit: (data: IncidentFormData) => void;
};

export default function IncidentForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncidentFormData>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      title: "",
      location: "",
      type: "",
      severity: "",
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Incident Title
        </label>

        <input
          {...register("title")}
          placeholder="Road accident near Highway 65"
          className="w-full rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Location
        </label>

        <select
          {...register("location")}
          className="w-full rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          <option value="">Select city / area</option>
          {LOCATION_OPTIONS.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {errors.location && (
          <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Incident Type
          </label>

          <select
            {...register("type")}
            className="w-full rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3 text-white"
          >
            <option value="">Select</option>
            <option>Fire</option>
            <option>Flood</option>
            <option>Earthquake</option>
            <option>Medical</option>
            <option>Traffic</option>
          </select>

          {errors.type && (
            <p className="mt-1 text-sm text-red-400">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Severity
          </label>

          <select
            {...register("severity")}
            className="w-full rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3 text-white"
          >
            <option value="">Select</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          {errors.severity && (
            <p className="mt-1 text-sm text-red-400">{errors.severity.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Description
        </label>

        <textarea
          {...register("description")}
          rows={5}
          placeholder="Describe the incident..."
          className="w-full rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="reset"
          className="rounded-lg border border-white/10 px-5 py-2 text-slate-300 transition hover:bg-white/5"
        >
          Reset
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Analyze with AI
        </button>
      </div>
    </form>
  );
}
