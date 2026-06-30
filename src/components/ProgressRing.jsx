export default function ProgressRing({ value, goal, label, unit, color, icon: Icon }) {
  const pct = goal > 0 ? Math.min(value / goal, 1) : 0;
  const size = 116;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);

  return (
    <div className="ring-card">
      <div className="ring-wrap" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="var(--line)" strokeWidth={stroke}
          />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="ring-center">
          {Icon && <Icon size={18} color={color} strokeWidth={2.2} />}
        </div>
      </div>
      <div className="ring-value">{value.toLocaleString()}<span className="ring-unit">{unit}</span></div>
      <div className="ring-label">{label}</div>
      <div className="ring-goal">goal {goal.toLocaleString()}{unit}</div>
    </div>
  );
}
