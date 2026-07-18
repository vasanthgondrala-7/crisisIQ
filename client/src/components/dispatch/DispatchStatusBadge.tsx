type Props = {
  arrived: boolean;
  moving: boolean;
};

export default function DispatchStatusBadge({
  arrived,
  moving,
}: Props) {
  let color =
    "bg-yellow-500/20 text-yellow-300";

  let text = "Preparing";

  if (moving) {
    color =
      "bg-blue-500/20 text-blue-300";

    text = "En Route";
  }

  if (arrived) {
    color =
      "bg-green-500/20 text-green-300";

    text = "Arrived";
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
    >
      {text}
    </span>
  );
}