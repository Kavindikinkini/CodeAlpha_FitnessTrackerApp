import { Footprints, Flame, Dumbbell, Sparkles } from "lucide-react";
import { useFitnessData } from "../lib/useFitnessData";
import ProgressRing from "../components/ProgressRing";
import WeeklyChart from "../components/WeeklyChart";
import LogForm from "../components/LogForm";
import ActivityList from "../components/ActivityList";

export default function Dashboard() {
  const {
    todayEntries, todayTotals, weekly, weekTotals, streak,
    addEntry, updateEntry, deleteEntry, goals,
  } = useFitnessData();

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <div className="page-sub">{todayLabel}</div>
        </div>
        {streak > 0 && (
          <div className="streak-badge">
            <Sparkles size={14} /> {streak} day{streak === 1 ? "" : "s"} streak
          </div>
        )}
      </div>

      <section className="rings-row">
        <ProgressRing
          value={todayTotals.steps}
          goal={goals.steps}
          label="Steps"
          unit=""
          color="var(--rose-deep)"
          icon={Footprints}
        />
        <ProgressRing
          value={todayTotals.calories}
          goal={goals.calories}
          label="Calories"
          unit=""
          color="var(--lilac)"
          icon={Flame}
        />
        <ProgressRing
          value={todayTotals.workouts}
          goal={goals.workouts}
          label="Workouts"
          unit=""
          color="var(--good)"
          icon={Dumbbell}
        />
      </section>

      <div className="two-col">
        <section className="panel">
          <div className="panel-head">
            <h2>This week</h2>
            <span className="panel-meta">
              {weekTotals.steps.toLocaleString()} steps · {weekTotals.calories.toLocaleString()} kcal · {weekTotals.minutes} min
            </span>
          </div>
          <WeeklyChart data={weekly} />
        </section>

        <section className="panel">
          <LogForm onAdd={addEntry} />
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Today's log</h2>
          <span className="panel-meta">{todayEntries.length} {todayEntries.length === 1 ? "entry" : "entries"}</span>
        </div>
        <ActivityList entries={todayEntries} onDelete={deleteEntry} onUpdate={updateEntry} />
      </section>
    </div>
  );
}
