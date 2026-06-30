# Pulse — Fitness Tracker App

A CodeAlpha App Development internship project (Task 3). Built with React + Vite.

## Features
- Log daily fitness activities: type, minutes, calories burned, and steps
- Dashboard with animated progress rings for steps, calories, and workouts vs. daily goals
- 7-day weekly steps chart (Recharts)
- Today's activity log with delete support
- Data persisted locally via `localStorage` — no backend required
- Clean, mobile-first, responsive UI

## Tech stack
- React 19 + Vite
- Recharts (charts)
- lucide-react (icons)
- Plain CSS with custom design tokens (no UI framework)

## Getting started
```bash
npm install
npm run dev
```
Then open the printed local URL in your browser.

To create a production build:
```bash
npm run build
npm run preview
```

## Project structure
```
src/
  App.jsx                 # Main dashboard layout
  App.css                 # Design system + styles
  lib/useFitnessData.js   # localStorage-backed data hook (entries, totals, weekly stats)
  components/
    ProgressRing.jsx      # Animated circular goal progress
    WeeklyChart.jsx       # 7-day bar chart of steps
    LogForm.jsx           # Form to add a new activity entry
    ActivityList.jsx      # Today's logged activities with delete
```

## Notes
Daily goals (8,000 steps / 500 kcal / 1 workout) are set as defaults in `lib/useFitnessData.js` and can be adjusted there.
