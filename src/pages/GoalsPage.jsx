import { useState } from "react";
import { Database, Trash2, Save } from "lucide-react";
import { useFitnessData } from "../lib/useFitnessData";

export default function GoalsPage() {
  const { goals, updateGoals, loadSampleData, clearAllData, entries } = useFitnessData();
  const [form, setForm] = useState(goals);
  const [saved, setSaved] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateGoals({
      steps: Number(form.steps) || 1,
      calories: Number(form.calories) || 1,
      workouts: Number(form.workouts) || 1,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    clearAllData();
    setConfirmClear(false);
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Goals</h1>
          <div className="page-sub">Customize your daily targets and manage your data</div>
        </div>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Daily goals</h2>
        </div>
        <form onSubmit={handleSubmit} className="goals-form">
          <label className="field">
            <span>Steps goal</span>
            <input
              type="number" min="1"
              value={form.steps}
              onChange={(e) => setForm((f) => ({ ...f, steps: e.target.value }))}
            />
          </label>
          <label className="field">
            <span>Calories goal</span>
            <input
              type="number" min="1"
              value={form.calories}
              onChange={(e) => setForm((f) => ({ ...f, calories: e.target.value }))}
            />
          </label>
          <label className="field">
            <span>Workouts goal</span>
            <input
              type="number" min="1"
              value={form.workouts}
              onChange={(e) => setForm((f) => ({ ...f, workouts: e.target.value }))}
            />
          </label>
          <button type="submit" className="btn-primary" style={{ marginTop: 4 }}>
            <Save size={16} /> {saved ? "Saved!" : "Save goals"}
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Sample data</h2>
        </div>
        <p className="panel-text">
          Load about three weeks of realistic sample activity to preview the dashboard, history, and
          stats pages with data. You currently have {entries.length} logged {entries.length === 1 ? "entry" : "entries"}.
        </p>
        <button className="btn-secondary" onClick={loadSampleData}>
          <Database size={16} /> Load sample data
        </button>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Reset</h2>
        </div>
        <p className="panel-text">
          This permanently deletes all logged activity from this device. This cannot be undone.
        </p>
        <button className="btn-danger" onClick={handleClear}>
          <Trash2 size={16} /> {confirmClear ? "Click again to confirm" : "Clear all data"}
        </button>
      </section>
    </div>
  );
}
