import { CATEGORIES, DIFFICULTIES, STATUSES } from "../data/constants";

export const MAX_TITLE_LENGTH = 120;

// Returns an object of error messages keyed by field name.
// An empty object means the values are valid.
export function validateQuestion(values) {
  const errors = {};
  const title = values.title.trim(); // "   " becomes "", so whitespace-only counts as empty

  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length > MAX_TITLE_LENGTH) {
    errors.title = `Title must be ${MAX_TITLE_LENGTH} characters or fewer.`;
  }

  // includes() rejects the "" placeholder option and any unexpected value.
  if (!CATEGORIES.includes(values.category))
    errors.category = "Please choose a category.";
  if (!DIFFICULTIES.includes(values.difficulty))
    errors.difficulty = "Please choose a difficulty.";
  if (!STATUSES.includes(values.status))
    errors.status = "Please choose a status.";

  return errors;
}
