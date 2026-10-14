import { Inbox } from "lucide-react";

export default function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state">
      <Inbox size={32} aria-hidden="true" />
      <h2>{title}</h2>
      <p className="muted">{message}</p>
      {action}
    </div>
  );
}
