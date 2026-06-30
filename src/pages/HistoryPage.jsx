import { useMemo, useState } from "react";
import { Flame, Footprints, Timer, Trash2, Pencil, Check } from "lucide-react";
import { useFitnessData } from "../lib/useFitnessData";
import { EXERCISE_TYPES } from "../lib/useFitnessData";

function formatDateLabel(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const key = (x) => x.toISOString().slice(0, 10);
  if (dateStr === key(today)) return "Today";
  if (dateStr === key(yesterday)) return "Yesterday";
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

export default function HistoryPage() {
  const { entries, updateEntry, deleteEntry } = useFitnessData();
  const [filterType, setFilterType] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  const filtered = useMemo(
    () => (filterType === "All" ? entries : entries.filter((e) => e.type === filterType)),
    [entries, filterType]
  );

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((e) => {
      map[e.date] = map[e.date] || [];
      map[e.date].push(e);
    });
    return Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  function startEdit(entry) {
    setEditingId(entry.id);
    setDraft({ ...entry });
  }

  function saveEdit() {
    updateEntry(editingId, {
      type: draft.type,
      minutes: Number(draft.minutes) || 0,
      calories: Number(draft.calories) || 0,
      steps: Number(draft.steps) || 0,
    });
    setEditingId(null);
    setDraft(null);
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">History</h1>
          <div className="page-sub">{entries.length} total {entries.length === 1 ? "entry" : "entries"}</div>
        </div>
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All activities</option>
          {EXERCISE_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {grouped.length === 0 ? (
        <div className="panel">
          <div className="empty-state">
            No activity history yet. Log something on the Dashboard, or load sample data from the Goals page.
          </div>
        </div>
      ) : (
        grouped.map(([date, dayEntries]) => (
          <section className="panel" key={date}>
            <div className="panel-head">
              <h2>{formatDateLabel(date)}</h2>
              <span className="panel-meta">{dayEntries.length} {dayEntries.length === 1 ? "entry" : "entries"}</span>
            </div>
            <ul className="activity-list">
              {dayEntries.map((e) => {
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
                        <input type="number" min="0" placeholder="min" value={draft.minutes}
                          onChange={(ev) => setDraft((d) => ({ ...d, minutes: ev.target.value }))} />
                        <input type="number" min="0" placeholder="kcal" value={draft.calories}
                          onChange={(ev) => setDraft((d) => ({ ...d, calories: ev.target.value }))} />
                        <input type="number" min="0" placeholder="steps" value={draft.steps}
                          onChange={(ev) => setDraft((d) => ({ ...d, steps: ev.target.value }))} />
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
                      <button className="icon-btn" onClick={() => deleteEntry(e.id)} aria-label={`Delete ${e.type} entry`}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
