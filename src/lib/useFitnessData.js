import { useState, useEffect, useCallback, useMemo } from "react";

const ENTRIES_KEY = "pulse_fitness_entries_v1";
const GOALS_KEY = "pulse_fitness_goals_v1";

const EXERCISE_TYPES = [
  "Running", "Walking", "Cycling", "Swimming", "Strength Training",
  "Yoga", "HIIT", "Sports", "Dancing", "Other",
];

const DEFAULT_GOALS = { steps: 8000, calories: 500, workouts: 1 };

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function lastNDays(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(todayKey(d));
  }
  return days;
}

export function useFitnessData() {
  const [entries, setEntries] = useState(() => loadJSON(ENTRIES_KEY, []));
  const [goals, setGoals] = useState(() => loadJSON(GOALS_KEY, DEFAULT_GOALS));

  useEffect(() => {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  }, [goals]);

  const addEntry = useCallback((entry) => {
    setEntries((prev) => [
      { id: crypto.randomUUID(), date: todayKey(), ...entry },
      ...prev,
    ]);
  }, []);

  const updateEntry = useCallback((id, patch) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateGoals = useCallback((patch) => {
    setGoals((prev) => ({ ...prev, ...patch }));
  }, []);

  const today = todayKey();
  const todayEntries = useMemo(
    () => entries.filter((e) => e.date === today),
    [entries, today]
  );

  const todayTotals = useMemo(() => {
    return todayEntries.reduce(
      (acc, e) => ({
        steps: acc.steps + (Number(e.steps) || 0),
        calories: acc.calories + (Number(e.calories) || 0),
        minutes: acc.minutes + (Number(e.minutes) || 0),
        workouts: acc.workouts + 1,
      }),
      { steps: 0, calories: 0, minutes: 0, workouts: 0 }
    );
  }, [todayEntries]);

  const weekly = useMemo(() => {
    const days = lastNDays(7);
    return days.map((date) => {
      const dayEntries = entries.filter((e) => e.date === date);
      const totals = dayEntries.reduce(
        (acc, e) => ({
          steps: acc.steps + (Number(e.steps) || 0),
          calories: acc.calories + (Number(e.calories) || 0),
          minutes: acc.minutes + (Number(e.minutes) || 0),
        }),
        { steps: 0, calories: 0, minutes: 0 }
      );
      const d = new Date(date);
      return {
        date,
        label: d.toLocaleDateString(undefined, { weekday: "short" }),
        ...totals,
      };
    });
  }, [entries]);

  const weekTotals = useMemo(
    () =>
      weekly.reduce(
        (acc, d) => ({
          steps: acc.steps + d.steps,
          calories: acc.calories + d.calories,
          minutes: acc.minutes + d.minutes,
        }),
        { steps: 0, calories: 0, minutes: 0 }
      ),
    [weekly]
  );

  const streak = useMemo(() => {
    const byDate = {};
    entries.forEach((e) => {
      byDate[e.date] = byDate[e.date] || { steps: 0, workouts: 0 };
      byDate[e.date].steps += Number(e.steps) || 0;
      byDate[e.date].workouts += 1;
    });
    let count = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const key = todayKey(d);
      const day = byDate[key];
      const metGoal = day && (day.steps >= goals.steps || day.workouts >= goals.workouts);
      if (metGoal) {
        count++;
        d.setDate(d.getDate() - 1);
      } else if (key === today) {
        d.setDate(d.getDate() - 1);
        continue;
      } else {
        break;
      }
    }
    return count;
  }, [entries, goals, today]);

  return {
    entries,
    todayEntries,
    todayTotals,
    weekly,
    weekTotals,
    streak,
    addEntry,
    updateEntry,
    deleteEntry,
    goals,
    updateGoals,
  };
}

export { EXERCISE_TYPES, DEFAULT_GOALS };