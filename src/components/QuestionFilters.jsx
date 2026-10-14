import { Search, X } from "lucide-react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../data/constants";

export default function QuestionFilters({
  filters,
  onChange,
  onClear,
  canClear,
  resultCount,
  totalCount,
}) {
  // One handler for every control, using the element's name attribute (same trick as the form).
  const handleChange = (e) => onChange(e.target.name, e.target.value);

  return (
    <section className="filters" aria-label="Search and filters">
      <div className="filters__search">
        <Search size={18} className="filters__search-icon" aria-hidden="true" />
        <input
          type="search"
          name="search"
          className="input filters__search-input"
          placeholder="Search questions by title"
          aria-label="Search questions by title"
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className="filters__row">
        <FilterSelect
          label="Category"
          name="category"
          value={filters.category}
          options={CATEGORIES}
          onChange={handleChange}
        />
        <FilterSelect
          label="Difficulty"
          name="difficulty"
          value={filters.difficulty}
          options={DIFFICULTIES}
          onChange={handleChange}
        />
        <FilterSelect
          label="Status"
          name="status"
          value={filters.status}
          options={STATUSES}
          onChange={handleChange}
        />

        <button
          type="button"
          className="btn"
          onClick={onClear}
          disabled={!canClear}
        >
          <X size={16} aria-hidden="true" />
          Clear filters
        </button>
      </div>

      {/* aria-live announces the new count to screen readers as the user types */}
      <p className="muted filters__count" aria-live="polite">
        Showing {resultCount} of {totalCount}{" "}
        {totalCount === 1 ? "question" : "questions"}
      </p>
    </section>
  );
}

// Defined at module level (not inside the component) so it keeps a stable identity.
function FilterSelect({ label, name, value, options, onChange }) {
  return (
    <div className="filters__select">
      <label htmlFor={`filter-${name}`} className="field-label">
        {label}
      </label>
      <select
        id={`filter-${name}`}
        name={name}
        className="select"
        value={value}
        onChange={onChange}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
