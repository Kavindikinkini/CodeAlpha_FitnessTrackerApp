import { NavLink } from "react-router-dom";
import { LayoutDashboard, History, BarChart3, Target, Activity } from "lucide-react";

const LINKS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/history", label: "History", icon: History },
  { to: "/stats", label: "Stats", icon: BarChart3 },
  { to: "/goals", label: "Goals", icon: Target },
];

export default function Nav() {
  return (
    <>
      <aside className="sidenav">
        <div className="sidenav-brand">
          <span className="brand-mark">
            <Activity size={20} strokeWidth={2.6} />
          </span>
          <div className="brand-name">Pulse</div>
        </div>
        <nav className="sidenav-links">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `sidenav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={18} strokeWidth={2.2} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidenav-footer">Data stored locally on this device.</div>
      </aside>

      <nav className="bottomnav">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `bottomnav-link ${isActive ? "active" : ""}`}
          >
            <Icon size={20} strokeWidth={2.2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
