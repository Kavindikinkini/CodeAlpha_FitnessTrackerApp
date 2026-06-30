import { useState } from "react";
import { Plus } from "lucide-react";
import { EXERCISE_TYPES } from "../lib/useFitnessData";

const empty = { type: EXERCISE_TYPES[0], minutes: "", calories: "", steps: "" };

export default function LogForm({ onAdd }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  function update(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const hasData = form.minutes || form.calories || form.steps;
    if (!hasData) {
      setError("Add at least one of minutes, calories, or steps.");
      return;
    }
    setError("");
    onAdd({
      type: form.type,
      minutes: form.minutes ? Number(form.minutes) : 0,
      calories: form.calories ? Number(form.calories) : 0,
      steps: form.steps ? Number(form.steps) : 0,
    });
    setForm(empty);
  }

  return (
    <form className="log-form" onSubmit={handleSubmit}>
      <div className="log-form-title">Log activity</div>
      <div className="log-form-grid">
        <label className="field">
          <span>Activity</span>
          <select value={form.type} onChange={(e) => update("type", e.target.value)}>
            {EXERCISE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Minutes</span>
          <input
            type="number" min="0" placeholder="30"
            value={form.minutes}
            onChange={(e) => update("minutes", e.target.value)}
          />
        </label>
        <label className="field">
          <span>Calories</span>
          <input
            type="number" min="0" placeholder="220"
            value={form.calories}
            onChange={(e) => update("calories", e.target.value)}
          />
        </label>
        <label className="field">
          <span>Steps</span>
          <input
            type="number" min="0" placeholder="3000"
            value={form.steps}
            onChange={(e) => update("steps", e.target.value)}
          />
        </label>
      </div>
      {error && <div className="form-error">{error}</div>}
      <button type="submit" className="btn-primary">
        <Plus size={16} strokeWidth={2.4} /> Add entry
      </button>
    </form>
  );
}
