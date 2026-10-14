import ProgressBar from "./ProgressBar";

// `categories` is stats.byCategory: [{ category, total, completed, percent }]
export default function ProgressSection({ categories }) {
  return (
    <section className="panel">
      <h2>Category progress</h2>
      <ul className="category-list">
        {categories.map(({ category, total, completed, percent }) => (
          <li key={category}>
            <div className="category-row">
              <span>{category}</span>
              <span className="muted">
                {completed}/{total} · {percent}%
              </span>
            </div>
            <ProgressBar percent={percent} label={`${category} progress`} />
          </li>
        ))}
      </ul>
    </section>
  );
}
