import Badge from "./Badge";
import { STATUS_TONE } from "../data/constants";
import { formatDate } from "../utils/formatDate";

export default function RecentQuestions({ questions }) {
  return (
    <section className="panel section-top">
      <h2>Recently updated</h2>
      {questions.length === 0 ? (
        <p className="muted">Nothing here yet.</p>
      ) : (
        <ul className="recent-list">
          {questions.map((q) => (
            <li key={q.id} className="recent-item">
              <div>
                <p className="recent-item__title">{q.title}</p>
                <p className="muted recent-item__date">
                  {formatDate(q.updatedAt)}
                </p>
              </div>
              <Badge tone={STATUS_TONE[q.status]}>{q.status}</Badge>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
