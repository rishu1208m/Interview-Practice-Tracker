import { useCallback, useMemo, useState } from "react";
import { ListChecks, Code, MessageSquare, Laptop, Plus } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { initialQuestions } from "./data/initialQuestions";
import { getStatistics, getRecentQuestions } from "./utils/statistics";
import { generateId } from "./utils/generateId";
import StatCard from "./components/StatCard";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import ProgressBar from "./components/ProgressBar";
import ProgressSection from "./components/ProgressSection";
import MachineCodingCard from "./components/MachineCodingCard";
import RecentQuestions from "./components/RecentQuestions";
import QuestionList from "./components/QuestionList";
import QuestionForm from "./components/QuestionForm";
import Toast from "./components/Toast";

export default function App() {
  const [questions, setQuestions] = useLocalStorage(
    "itp:questions",
    initialQuestions,
    Array.isArray,
  );
  const [machineCodingStatus, setMachineCodingStatus] = useLocalStorage(
    "itp:machine-coding",
    "Not Started",
  );
  const [view, setView] = useState("dashboard");

  // null = form closed | { mode: "add" } | { mode: "edit", question }
  const [formState, setFormState] = useState(null);
  // null or { id, message }. The id restarts the toast's timer when messages repeat.
  const [toast, setToast] = useState(null);

  // Derived data: recomputed from `questions`, never stored separately.
  const stats = useMemo(() => getStatistics(questions), [questions]);
  const recentQuestions = useMemo(
    () => getRecentQuestions(questions),
    [questions],
  );

  const showToast = (message) => setToast({ id: Date.now(), message });
  // useCallback keeps this function's identity stable. Toast's effect depends on it,
  // so without it the auto-dismiss timer would reset whenever App re-rendered.
  const dismissToast = useCallback(() => setToast(null), []);

  const openAddForm = () => setFormState({ mode: "add" });
  const openEditForm = (question) => setFormState({ mode: "edit", question });
  const closeForm = () => setFormState(null);

  // Handles both add and edit. `values` has: title, category, difficulty, status, notes.
  const handleSave = (values) => {
    const now = new Date().toISOString();

    if (formState.mode === "edit") {
      const { id } = formState.question;
      setQuestions((prev) =>
        prev.map((q) =>
          // Old question first, new values second; id is forced to stay the same.
          q.id === id ? { ...q, ...values, id: q.id, updatedAt: now } : q,
        ),
      );
      showToast("Question updated.");
    } else {
      setQuestions((prev) => [
        { id: generateId(), ...values, createdAt: now, updatedAt: now },
        ...prev, // newest first
      ]);
      showToast("Question added.");
    }
    closeForm();
  };

  const handleStatusChange = (id, status) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status, updatedAt: new Date().toISOString() } : q,
      ),
    );
    showToast("Status updated.");
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    showToast("Question deleted.");
  };

  const isDashboard = view === "dashboard";

  return (
    <div className="app">
      <Sidebar view={view} onNavigate={setView} />

      <div className="app__content">
        <main className="page">
          <header className="page__header">
            <div>
              <h1>{isDashboard ? "Dashboard" : "Questions"}</h1>
              <p>
                {isDashboard
                  ? "Track your weekly interview preparation."
                  : "Add, edit and organise your practice questions."}
              </p>
            </div>
            <button
              type="button"
              className="btn btn--primary"
              onClick={openAddForm}
            >
              <Plus size={18} aria-hidden="true" />
              Add question
            </button>
          </header>

          {isDashboard ? (
            <>
              <section className="stats-grid" aria-label="Summary">
                <StatCard
                  icon={ListChecks}
                  label="Total Questions"
                  value={stats.total}
                />
                <StatCard
                  icon={Code}
                  label="Completed DSA"
                  value={stats.completedDsa}
                />
                <StatCard
                  icon={MessageSquare}
                  label="Completed Interview Qs"
                  value={stats.completedInterview}
                />
                <StatCard
                  icon={Laptop}
                  label="Machine Coding"
                  value={machineCodingStatus}
                />
              </section>

              <section className="panel section-gap">
                <h2>Overall completion</h2>
                <p className="overall">{stats.overallPercent}%</p>
                <ProgressBar
                  percent={stats.overallPercent}
                  label="Overall completion"
                />
                {stats.total === 0 && (
                  <p className="muted">
                    No questions yet. Add one to start tracking.
                  </p>
                )}
              </section>

              <div className="two-col">
                <ProgressSection categories={stats.byCategory} />
                <MachineCodingCard
                  status={machineCodingStatus}
                  onChange={setMachineCodingStatus}
                />
              </div>

              <RecentQuestions questions={recentQuestions} />
            </>
          ) : (
            <QuestionList
              questions={questions}
              onStatusChange={handleStatusChange}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onAdd={openAddForm}
            />
          )}
        </main>
      </div>

      <MobileNav view={view} onNavigate={setView} />

      {/* Mounted only while open, so its state starts fresh every time */}
      {formState && (
        <QuestionForm
          question={formState.mode === "edit" ? formState.question : null}
          onSubmit={handleSave}
          onCancel={closeForm}
        />
      )}

      {toast && (
        <Toast key={toast.id} message={toast.message} onClose={dismissToast} />
      )}
    </div>
  );
}
