import { useMemo, useState } from "react";
import QuestionCard from "./QuestionCard";
import QuestionFilters from "./QuestionFilters";
import EmptyState from "./EmptyState";
import ConfirmDialog from "./ConfirmDialog";
import {
  DEFAULT_FILTERS,
  filterQuestions,
  hasActiveFilters,
} from "../utils/filterQuestions";

export default function QuestionList({
  questions,
  onStatusChange,
  onEdit,
  onDelete,
  onAdd,
}) {
  // All hooks go ABOVE the early return below. Hooks must run in the same order every render.
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [pendingDelete, setPendingDelete] = useState(null);

  // Derived data: recomputed only when the questions or the filters change.
  const filteredQuestions = useMemo(
    () => filterQuestions(questions, filters),
    [questions, filters],
  );

  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));
  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  // State 1: nothing is tracked at all.
  if (questions.length === 0) {
    return (
      <EmptyState
        title="No questions yet"
        message="Your tracker is empty. Add your first question to start tracking."
        action={
          <button type="button" className="btn btn--primary" onClick={onAdd}>
            Add your first question
          </button>
        }
      />
    );
  }

  const confirmDelete = () => {
    onDelete(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <>
      <QuestionFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={clearFilters}
        canClear={hasActiveFilters(filters)}
        resultCount={filteredQuestions.length}
        totalCount={questions.length}
      />

      {/* State 2: questions exist, but the search/filters match none of them. */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          title="No matching questions"
          message="Nothing matches your search or filters. Try changing them or clear them all."
          action={
            <button type="button" className="btn" onClick={clearFilters}>
              Clear filters
            </button>
          }
        />
      ) : (
        <ul className="question-list">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onStatusChange={onStatusChange}
              onEditClick={onEdit}
              onDeleteClick={setPendingDelete}
            />
          ))}
        </ul>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this question?"
          message={`"${pendingDelete.title}" will be removed permanently.`}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </>
  );
}
