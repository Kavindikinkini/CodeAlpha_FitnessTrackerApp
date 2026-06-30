import { useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const METRICS = {
  steps: { label: "Steps", unit: "", grad: ["var(--lilac)", "var(--rose)"] },
  calories: { label: "Calories", unit: " kcal", grad: ["#f3c977", "var(--rose-deep)"] },
  minutes: { label: "Minutes", unit: " min", grad: ["#8fd0c4", "var(--lilac)"] },
};

function CustomTooltip({ active, payload, label, metric }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tip">
      <div className="chart-tip-label">{label}</div>
      <div className="chart-tip-row">
        <span style={{ color: "var(--rose-deep)" }}>●</span> {payload[0].value.toLocaleString()}{METRICS[metric].unit}
      </div>
    </div>
  );
}

export default function WeeklyChart({ data }) {
  const [metric, setMetric] = useState("steps");

  return (
    <div>
      <div className="chart-tabs">
        {Object.entries(METRICS).map(([key, m]) => (
          <button
            key={key}
            className={`chart-tab ${metric === key ? "active" : ""}`}
            onClick={() => setMetric(key)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={220}>
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
            <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: "var(--lavender-soft)" }} />
            <Bar dataKey={metric} radius={[8, 8, 8, 8]} fill={`url(#grad-${metric})`} maxBarSize={32} />
            <defs>
              {Object.entries(METRICS).map(([key, m]) => (
                <linearGradient id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1" key={key}>
                  <stop offset="0%" stopColor={m.grad[0]} />
                  <stop offset="100%" stopColor={m.grad[1]} />
                </linearGradient>
              ))}
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
