# Pulse — Fitness Tracker App

A CodeAlpha App Development internship project (Task 3). Built with React + Vite.

## Features
- **Dashboard** — log activities, see today's progress rings (steps/calories/workouts), weekly chart, streak badge
- **History** — full activity log grouped by day, filterable by activity type, inline edit/delete
- **Stats** — 30-day steps trend, lifetime totals, activity-type breakdown
- **Goals** — customize daily targets, load sample data, clear all data
- Multi-page navigation: sidebar on desktop, bottom tab bar on mobile (React Router)
- Data persisted locally via `localStorage` — no backend required
- Built-in dummy data generator for previewing the app with realistic activity history

## Tech stack
- React 19 + Vite
- React Router (multi-page navigation)
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
  App.jsx                 # Router shell (nav + routes)
  App.css                 # Design system + styles
  lib/
    useFitnessData.js     # localStorage-backed data hook
    seedData.js            # Dummy data generator
  pages/
    Dashboard.jsx          # Today's overview + log form
    HistoryPage.jsx        # Full log, grouped by date, filterable
    StatsPage.jsx           # 30-day trend, totals, breakdown
    GoalsPage.jsx           # Goal settings + sample data / reset
  components/
    Nav.jsx                # Sidebar (desktop) / bottom tabs (mobile)
    ProgressRing.jsx        # Animated circular goal progress
    WeeklyChart.jsx          # 7-day bar chart (steps/calories/minutes)
    LogForm.jsx              # Form to add a new activity entry
    ActivityList.jsx          # Activity list with inline edit/delete
```

## Notes
Daily goals (8,000 steps / 500 kcal / 1 workout) are set as defaults in `lib/useFitnessData.js` and can be adjusted there.
