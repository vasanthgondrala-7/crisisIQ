type Props = {
  score: number;
};

export default function RiskScore({
  score,
}: Props) {
  let color =
    "text-green-400";

  if (score > 60)
    color = "text-yellow-400";

  if (score > 85)
    color = "text-red-400";

  return (
    <div className="rounded-xl bg-[#0F172A] p-4">

      <p className="text-sm text-slate-400">
        Risk Score
      </p>

      <h2
        className={`mt-2 text-4xl font-bold ${color}`}
      >
        {score}%
      </h2>

    </div>
  );
}