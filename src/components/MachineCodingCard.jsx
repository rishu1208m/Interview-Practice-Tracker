import { MACHINE_CODING_STATUSES } from "../data/constants";

export default function MachineCodingCard({ status, onChange }) {
  return (
    <section className="panel">
      <h2>Machine Coding</h2>
      <label htmlFor="machine-status" className="field-label">
        Current status
      </label>
      {/* Controlled select: React state is the single source of truth for its value */}
      <select
        id="machine-status"
        className="select"
        value={status}
        onChange={(e) => onChange(e.target.value)}
      >
        {MACHINE_CODING_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </section>
  );
}
