import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tip">
      <div className="chart-tip-label">{label}</div>
      <div className="chart-tip-row">
        <span style={{ color: "var(--rose-deep)" }}>●</span> {payload[0].value.toLocaleString()} steps
      </div>
    </div>
  );
}

export default function WeeklyChart({ data }) {
  return (
    <div className="chart-box">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--line)" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--ink-soft)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--ink-soft)", fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--lavender-soft)" }} />
          <Bar dataKey="steps" radius={[8, 8, 8, 8]} fill="url(#barGrad)" maxBarSize={28} />
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--lilac)" />
              <stop offset="100%" stopColor="var(--rose)" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
