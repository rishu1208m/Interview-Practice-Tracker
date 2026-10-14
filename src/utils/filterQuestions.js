export const DEFAULT_FILTERS = {
  search: "",
  category: "",
  difficulty: "",
  status: "",
};

// A question must pass EVERY active condition. "" means "no filter on this field".
export function filterQuestions(questions, filters) {
  const term = filters.search.trim().toLowerCase();

  return questions.filter(
    (q) =>
      (!term || q.title.toLowerCase().includes(term)) && // case-insensitive search
      (!filters.category || q.category === filters.category) &&
      (!filters.difficulty || q.difficulty === filters.difficulty) &&
      (!filters.status || q.status === filters.status),
  );
}

// True if the user has set anything. Used to enable/disable "Clear filters".
export function hasActiveFilters(filters) {
  return Object.values(filters).some((value) => value.trim() !== "");
}
