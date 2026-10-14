import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  // Auto-dismiss after 3 seconds. The cleanup cancels the timer if the toast
  // is replaced or unmounted first, so we never update state after unmounting.
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    // role="status" makes screen readers announce the message politely
    <div className="toast" role="status">
      <CheckCircle2 size={18} aria-hidden="true" />
      <span>{message}</span>
      <button
        type="button"
        className="toast__close"
        aria-label="Dismiss notification"
        onClick={onClose}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
