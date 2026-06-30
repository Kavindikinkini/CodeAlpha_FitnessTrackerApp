import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Flame, Footprints, Timer, ListChecks } from "lucide-react";
import { useFitnessData } from "../lib/useFitnessData";

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={18} /></div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

function TipBox({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tip">
      <div className="chart-tip-label">{label}</div>
      <div className="chart-tip-row">{payload[0].value.toLocaleString()} steps</div>
    </div>
  );
}

export default function StatsPage() {
  const { entries, monthly, typeBreakdown } = useFitnessData();

  const activeDays = useMemo(() => new Set(entries.map((e) => e.date)).size, [entries]);

  const totals = useMemo(
    () =>
      entries.reduce(
        (acc, e) => ({
          steps: acc.steps + (Number(e.steps) || 0),
          calories: acc.calories + (Number(e.calories) || 0),
          minutes: acc.minutes + (Number(e.minutes) || 0),
        }),
        { steps: 0, calories: 0, minutes: 0 }
      ),
    [entries]
  );

  const avgStepsPerActiveDay = activeDays > 0 ? Math.round(totals.steps / activeDays) : 0;
  const maxTypeCount = typeBreakdown.length > 0 ? typeBreakdown[0].count : 1;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Stats</h1>
          <div className="page-sub">Trends across all logged activity</div>
        </div>
      </div>

      <section className="stat-grid">
        <StatCard icon={Footprints} label="Total steps" value={totals.steps.toLocaleString()} />
        <StatCard icon={Flame} label="Total calories" value={totals.calories.toLocaleString()} sub="kcal burned" />
        <StatCard icon={Timer} label="Total time" value={`${Math.round(totals.minutes / 60)}h ${totals.minutes % 60}m`} />
        <StatCard icon={ListChecks} label="Active days" value={activeDays} sub={`avg ${avgStepsPerActiveDay.toLocaleString()} steps/day`} />
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Last 30 days — steps</h2>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthly} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--line)" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--ink-soft)", fontSize: 10 }}
              interval={4}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--ink-soft)", fontSize: 11 }} />
            <Tooltip content={<TipBox />} cursor={{ stroke: "var(--lilac)" }} />
            <Line type="monotone" dataKey="steps" stroke="var(--rose-deep)" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Activity breakdown</h2>
          <span className="panel-meta">by frequency</span>
        </div>
        {typeBreakdown.length === 0 ? (
          <div className="empty-state">No activity logged yet.</div>
        ) : (
          <div className="breakdown-list">
            {typeBreakdown.map((t) => (
              <div className="breakdown-row" key={t.type}>
                <span className="breakdown-label">{t.type}</span>
                <div className="breakdown-bar-track">
                  <div
                    className="breakdown-bar-fill"
                    style={{ width: `${(t.count / maxTypeCount) * 100}%` }}
                  />
                </div>
                <span className="breakdown-count">{t.count}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
