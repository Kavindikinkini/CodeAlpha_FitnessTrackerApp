import { Trash2, Flame, Footprints, Timer } from "lucide-react";

export default function ActivityList({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        Nothing logged yet today. Add your first activity above to start tracking.
      </div>
    );
  }

  return (
    <ul className="activity-list">
      {entries.map((e) => (
        <li key={e.id} className="activity-item">
          <div className="activity-dot" />
          <div className="activity-main">
            <div className="activity-type">{e.type}</div>
            <div className="activity-stats">
              {e.minutes > 0 && (
                <span><Timer size={13} /> {e.minutes} min</span>
              )}
              {e.calories > 0 && (
                <span><Flame size={13} /> {e.calories} kcal</span>
              )}
              {e.steps > 0 && (
                <span><Footprints size={13} /> {e.steps.toLocaleString()} steps</span>
              )}
            </div>
          </div>
          <button
            className="icon-btn"
            onClick={() => onDelete(e.id)}
            aria-label={`Delete ${e.type} entry`}
          >
            <Trash2 size={15} />
          </button>
        </li>
      ))}
    </ul>
  );
}
