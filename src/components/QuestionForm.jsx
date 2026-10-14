import { useEffect, useRef, useState } from "react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../data/constants";
import { validateQuestion } from "../utils/validation";

// Add mode starts with empty category/difficulty so the user must choose them.
const EMPTY_VALUES = {
  title: "",
  category: "",
  difficulty: "",
  status: "Pending",
  notes: "",
};

export default function QuestionForm({ question, onSubmit, onCancel }) {
  const isEdit = Boolean(question);
  const dialogRef = useRef(null);

  // Initial values come from the question being edited, or the empty defaults.
  const [values, setValues] = useState(() =>
    question
      ? {
          title: question.title,
          category: question.category,
          difficulty: question.difficulty,
          status: question.status,
          notes: question.notes ?? "",
        }
      : EMPTY_VALUES,
  );
  const [errors, setErrors] = useState({});

  // Open as a native modal (backdrop, focus trap, Escape to close).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // One handler for every field, using the input's name attribute.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser's full page reload
    const foundErrors = validateQuestion(values);

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return; // do not save invalid data
    }

    // Trim before saving so "  Two Sum  " is stored as "Two Sum".
    onSubmit({
      ...values,
      title: values.title.trim(),
      notes: values.notes.trim(),
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="dialog dialog--form"
      aria-labelledby="form-title"
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
    >
      <h2 id="form-title">{isEdit ? "Edit question" : "Add question"}</h2>

      {/* noValidate: we show our own error messages instead of the browser's popups */}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <FormField id="q-title" label="Title" required error={errors.title}>
          <input
            id="q-title"
            name="title"
            type="text"
            className="input"
            value={values.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "q-title-error" : undefined}
            autoFocus
          />
        </FormField>

        <div className="form__row">
          <FormField
            id="q-category"
            label="Category"
            required
            error={errors.category}
          >
            <select
              id="q-category"
              name="category"
              className="select"
              value={values.category}
              onChange={handleChange}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={
                errors.category ? "q-category-error" : undefined
              }
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="q-difficulty"
            label="Difficulty"
            required
            error={errors.difficulty}
          >
            <select
              id="q-difficulty"
              name="difficulty"
              className="select"
              value={values.difficulty}
              onChange={handleChange}
              aria-invalid={Boolean(errors.difficulty)}
              aria-describedby={
                errors.difficulty ? "q-difficulty-error" : undefined
              }
            >
              <option value="">Select difficulty</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="q-status"
            label="Status"
            required
            error={errors.status}
          >
            <select
              id="q-status"
              name="status"
              className="select"
              value={values.status}
              onChange={handleChange}
              aria-invalid={Boolean(errors.status)}
              aria-describedby={errors.status ? "q-status-error" : undefined}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField id="q-notes" label="Notes (optional)">
          <textarea
            id="q-notes"
            name="notes"
            className="textarea"
            rows={3}
            value={values.notes}
            onChange={handleChange}
          />
        </FormField>

        <div className="dialog__actions">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {isEdit ? "Save changes" : "Add question"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

// Label + control + error message. It is defined at module level, NOT inside
// QuestionForm. A component defined inside another gets a new identity on every
// render, so React would remount it and the input would lose focus on each keystroke.
function FormField({ id, label, required, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
