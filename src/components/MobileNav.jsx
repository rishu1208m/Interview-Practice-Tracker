import { NAV_ITEMS } from "../data/navItems";

export default function MobileNav({ view, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={`nav-item ${view === id ? "nav-item--active" : ""}`}
          onClick={() => onNavigate(id)}
          aria-current={view === id ? "page" : undefined}
        >
          <Icon size={20} aria-hidden="true" />
          {label}
        </button>
      ))}
    </nav>
  );
}
