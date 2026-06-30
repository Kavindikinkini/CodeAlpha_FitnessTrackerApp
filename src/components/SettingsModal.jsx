import { useState } from "react";
import { X } from "lucide-react";

export default function SettingsModal({ goals, onSave, onClose }) {
  const [form, setForm] = useState(goals);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      steps: Number(form.steps) || 1,
      calories: Number(form.calories) || 1,
      workouts: Number(form.workouts) || 1,
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Daily goals</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close settings">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
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
          <button type="submit" className="btn-primary">Save goals</button>
        </form>
      </div>
    </div>
  );
}