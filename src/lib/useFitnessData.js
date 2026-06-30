import { useState, useEffect, useCallback, useMemo } from "react";

const STORAGE_KEY = "pulse_fitness_entries_v1";

const EXERCISE_TYPES = [
  "Running", "Walking", "Cycling", "Swimming", "Strength Training",
  "Yoga", "HIIT", "Sports", "Dancing", "Other",
];

const GOALS = { steps: 8000, calories: 500, workouts: 1 };

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
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
  const [entries, setEntries] = useState(loadEntries);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((entry) => {
    setEntries((prev) => [
      { id: crypto.randomUUID(), date: todayKey(), ...entry },
      ...prev,
    ]);
  }, []);

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
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

  return {
    entries,
    todayEntries,
    todayTotals,
    weekly,
    weekTotals,
    addEntry,
    deleteEntry,
    goals: GOALS,
  };
}

export { EXERCISE_TYPES, GOALS };
