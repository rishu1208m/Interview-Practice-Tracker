import { Target } from "lucide-react";
import { NAV_ITEMS } from "../data/navItems";

export default function Sidebar({ view, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <Target size={22} aria-hidden="true" />
        <span>Interview Tracker</span>
      </div>

      <nav aria-label="Main">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`nav-item ${view === id ? "nav-item--active" : ""}`}
            onClick={() => onNavigate(id)}
            aria-current={view === id ? "page" : undefined}
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
