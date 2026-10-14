import { CATEGORIES } from "../data/constants";

export function getPercentage(completed, total) {
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

export function getStatistics(questions) {
  const total = questions.length;
  const isDone = (q) => q.status === "Completed";

  const completedDsa = questions.filter(
    (q) => q.category === "DSA" && isDone(q),
  ).length;
  const completedInterview = questions.filter(
    (q) => q.category !== "DSA" && isDone(q),
  ).length;
  const completedTotal = questions.filter(isDone).length;

  const byCategory = CATEGORIES.map((category) => {
    const inCategory = questions.filter((q) => q.category === category);
    const done = inCategory.filter(isDone).length;
    return {
      category,
      total: inCategory.length,
      completed: done,
      percent: getPercentage(done, inCategory.length),
    };
  });

  return {
    total,
    completedDsa,
    completedInterview,
    completedTotal,
    overallPercent: getPercentage(completedTotal, total),
    byCategory,
  };
}

export function getRecentQuestions(questions, limit = 5) {
  return [...questions]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit);
}
