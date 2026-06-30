import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import StatsPage from "./pages/StatsPage";
import GoalsPage from "./pages/GoalsPage";

export default function App() {
  return (
    <div className="app-shell">
      <Nav />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/goals" element={<GoalsPage />} />
        </Routes>
      </div>
    </div>
  );
}
