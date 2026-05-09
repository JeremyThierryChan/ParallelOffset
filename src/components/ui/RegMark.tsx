interface RegMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function RegMark({
  size = 28,
  color = "currentColor",
  className = "",
}: RegMarkProps) {
  const r = size / 2;
  const arm = size * 0.7;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx={r} cy={r} r={r - 1} stroke={color} strokeWidth={0.75} />
      <line x1={r} y1={r - arm / 2} x2={r} y2={r + arm / 2} stroke={color} strokeWidth={0.75} />
      <line x1={r - arm / 2} y1={r} x2={r + arm / 2} y2={r} stroke={color} strokeWidth={0.75} />
    </svg>
  );
}
