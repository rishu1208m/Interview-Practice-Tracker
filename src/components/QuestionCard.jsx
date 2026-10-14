import { Pencil, Trash2 } from "lucide-react";
import Badge from "./Badge";
import { STATUSES, STATUS_TONE, DIFFICULTY_TONE } from "../data/constants";
import { formatDate } from "../utils/formatDate";

export default function QuestionCard({
  question,
  onStatusChange,
  onEditClick,
  onDeleteClick,
}) {
  const { id, title, category, difficulty, status, notes, updatedAt } =
    question;

  return (
    <li className="question-card">
      <div className="question-card__main">
        <h2 className="question-card__title">{title}</h2>
        <div className="badges">
          <Badge tone="primary">{category}</Badge>
          <Badge tone={DIFFICULTY_TONE[difficulty]}>{difficulty}</Badge>
          <Badge tone={STATUS_TONE[status]}>{status}</Badge>
        </div>
        {notes && <p className="question-card__notes">{notes}</p>}
        <p className="muted question-card__date">
          Updated {formatDate(updatedAt)}
        </p>
      </div>

      <div className="question-card__actions">
        <select
          className="select"
          aria-label={`Change status for ${title}`}
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="icon-btn icon-btn--edit"
          aria-label={`Edit ${title}`}
          onClick={() => onEditClick(question)}
        >
          <Pencil size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label={`Delete ${title}`}
          onClick={() => onDeleteClick(question)}
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}
