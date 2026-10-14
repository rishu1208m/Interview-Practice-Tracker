import { useEffect, useRef } from "react";

// Uses the native <dialog> element. showModal() gives us a backdrop, a focus trap,
// and Escape-to-close with no library.
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    // The `open` check matters: StrictMode runs effects twice in development,
    // and calling showModal() on an open dialog throws an error.
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby="confirm-title"
      onCancel={(e) => {
        e.preventDefault(); // we close it ourselves by unmounting
        onCancel();
      }}
    >
      <h2 id="confirm-title">{title}</h2>
      <p className="muted">{message}</p>
      <div className="dialog__actions">
        <button type="button" className="btn" onClick={onCancel} autoFocus>
          Cancel
        </button>
        <button type="button" className="btn btn--danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
