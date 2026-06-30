import { EXERCISE_TYPES } from "./useFitnessData";

function dateKey(d) {
  return d.toISOString().slice(0, 10);
}

// Generates ~21 days of realistic-looking sample activity history.
export function generateDummyEntries() {
  const entries = [];
  const days = 21;

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const date = dateKey(d);

    // Skip some days entirely to look like real human behavior (rest days)
    const isRestDay = Math.random() < 0.18;
    if (isRestDay) continue;

    const numEntries = Math.random() < 0.3 ? 2 : 1;

    for (let j = 0; j < numEntries; j++) {
      const type = EXERCISE_TYPES[Math.floor(Math.random() * (EXERCISE_TYPES.length - 1))];
      const minutes = Math.round(20 + Math.random() * 50);
      const calories = Math.round(minutes * (4 + Math.random() * 6));
      const steps =
        type === "Running" || type === "Walking"
          ? Math.round(2000 + Math.random() * 7000)
          : Math.round(Math.random() * 2000);

      entries.push({
        id: crypto.randomUUID(),
        date,
        type,
        minutes,
        calories,
        steps,
      });
    }
  }

  return entries;
}
