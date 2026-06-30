import { useState } from "react";
import { Trash2, Pencil, Check, Flame, Footprints, Timer } from "lucide-react";
import { EXERCISE_TYPES } from "../lib/useFitnessData";

export default function ActivityList({ entries, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        Nothing logged yet today. Add your first activity above to start tracking.
      </div>
    );
  }

  function startEdit(entry) {
    setEditingId(entry.id);
    setDraft({ ...entry });
  }

  function saveEdit() {
    onUpdate(editingId, {
      type: draft.type,
      minutes: Number(draft.minutes) || 0,
      calories: Number(draft.calories) || 0,
      steps: Number(draft.steps) || 0,
    });
    setEditingId(null);
    setDraft(null);
  }

  return (
    <ul className="activity-list">
      {entries.map((e) => {
        const isEditing = editingId === e.id;
        return (
          <li key={e.id} className="activity-item">
            <div className="activity-dot" />
            {isEditing ? (
              <div className="activity-edit-grid">
                <select
                  value={draft.type}
                  onChange={(ev) => setDraft((d) => ({ ...d, type: ev.target.value }))}
                >
                  {EXERCISE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <input
                  type="number" min="0" placeholder="min"
                  value={draft.minutes}
                  onChange={(ev) => setDraft((d) => ({ ...d, minutes: ev.target.value }))}
                />
                <input
                  type="number" min="0" placeholder="kcal"
                  value={draft.calories}
                  onChange={(ev) => setDraft((d) => ({ ...d, calories: ev.target.value }))}
                />
                <input
                  type="number" min="0" placeholder="steps"
                  value={draft.steps}
                  onChange={(ev) => setDraft((d) => ({ ...d, steps: ev.target.value }))}
                />
              </div>
            ) : (
              <div className="activity-main">
                <div className="activity-type">{e.type}</div>
                <div className="activity-stats">
                  {e.minutes > 0 && <span><Timer size={13} /> {e.minutes} min</span>}
                  {e.calories > 0 && <span><Flame size={13} /> {e.calories} kcal</span>}
                  {e.steps > 0 && <span><Footprints size={13} /> {e.steps.toLocaleString()} steps</span>}
                </div>
              </div>
            )}
            <div className="activity-actions">
              {isEditing ? (
                <button className="icon-btn" onClick={saveEdit} aria-label="Save changes">
                  <Check size={15} />
                </button>
              ) : (
                <button className="icon-btn" onClick={() => startEdit(e)} aria-label={`Edit ${e.type} entry`}>
                  <Pencil size={14} />
                </button>
              )}
              <button className="icon-btn" onClick={() => onDelete(e.id)} aria-label={`Delete ${e.type} entry`}>
                <Trash2 size={15} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
