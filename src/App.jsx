import { useState } from "react";
import { Footprints, Flame, Dumbbell, Activity, Settings, Sparkles } from "lucide-react";
import "./App.css";
import { useFitnessData } from "./lib/useFitnessData";
import ProgressRing from "./components/ProgressRing";
import WeeklyChart from "./components/WeeklyChart";
import LogForm from "./components/LogForm";
import ActivityList from "./components/ActivityList";
import SettingsModal from "./components/SettingsModal";

export default function App() {
  const {
    todayEntries, todayTotals, weekly, weekTotals, streak,
    addEntry, updateEntry, deleteEntry, goals, updateGoals,
  } = useFitnessData();
  const [showSettings, setShowSettings] = useState(false);

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">
            <Activity size={22} strokeWidth={2.6} />
          </span>
          <div>
            <div className="brand-name">Pulse</div>
            <div className="brand-sub">{todayLabel}</div>
          </div>
        </div>
        <div className="header-actions">
          {streak > 0 && (
            <div className="streak-badge">
              <Sparkles size={14} /> {streak} day{streak === 1 ? "" : "s"}
            </div>
          )}
          <button className="icon-btn settings-btn" onClick={() => setShowSettings(true)} aria-label="Edit goals">
            <Settings size={18} />
          </button>
        </div>
      </header>

      <main className="app-main">
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
      </main>

      <footer className="app-footer">Data is stored locally on this device.</footer>

      {showSettings && (
        <SettingsModal goals={goals} onSave={updateGoals} onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}