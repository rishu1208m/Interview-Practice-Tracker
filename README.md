# Interview Practice Tracker

A responsive dashboard for tracking weekly interview preparation across DSA, Git & GitHub, Technical (Full Stack) questions, and Machine Coding. It runs entirely in the browser and saves data in LocalStorage.

- **Live demo:** (https://interview-practice-tracker-sable.vercel.app/)
- **GitHub repository:** (https://github.com/rishu1208m/Interview-Practice-Tracker.git)

## Features

- Dashboard with summary cards, overall completion %, category-wise progress, and recently updated questions
- Add, edit, and delete questions (delete asks for confirmation)
- Change a question's status inline: Pending, In Progress, Completed
- Search by title plus filters for category, difficulty and status, all working together, with a Clear filters button
- Separate empty states for "no questions yet" and "no matching results"
- Machine Coding status tracker (Not Started, In Progress, Completed)
- Form validation, toast feedback, and an accessible modal dialog
- Responsive layout: sidebar on desktop, bottom navigation on mobile
- Data survives page refresh, and corrupted saved data is handled safely

## Technologies

React 19 (Vite), JavaScript (ES6+), HTML5, CSS3 (custom properties), React Hooks (`useState`, `useEffect`, `useMemo`, `useRef`, `useCallback`), LocalStorage, Lucide React icons.

## Getting started

Requires Node.js 18 or newer.

```bash
git clone <your-repository-url>
cd interview-practice-tracker
npm install
npm run dev
```

Open the local URL printed in the terminal (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # production build into /dist
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Counting rules

| Metric | Rule |
|---|---|
| Total Questions | Every tracked question |
| Completed DSA | Category is DSA and status is Completed |
| Completed Interview Questions | Category is Git & GitHub or Technical, and status is Completed |
| Overall completion % | Completed / Total x 100, rounded. It is 0% when there are no questions |
| Category progress | The same formula within each category |

All statistics are calculated from the question list on every render. Nothing is hardcoded or stored separately.

## Folder structure

```
src/
  components/   Reusable UI (Sidebar, MobileNav, StatCard, ProgressBar, ProgressSection,
                MachineCodingCard, RecentQuestions, QuestionList, QuestionCard,
                QuestionFilters, QuestionForm, EmptyState, ConfirmDialog, Badge, Toast)
  hooks/        useLocalStorage.js
  utils/        statistics.js, validation.js, filterQuestions.js,
                sanitizeQuestions.js, formatDate.js, generateId.js
  data/         constants.js, initialQuestions.js, navItems.js
  App.jsx       Owns the app state and wires components together
  main.jsx      Entry point
  index.css     Design tokens and all styles
```

## Architecture

`App` owns the two pieces of saved state (`questions` and `machineCodingStatus`) through the `useLocalStorage` hook. Statistics, recent questions and filtered lists are **derived** from that state with pure functions, so there is a single source of truth. Child components receive data and callbacks through props.

## LocalStorage behavior

| Key | Contents |
|---|---|
| `itp:questions` | Array of question objects |
| `itp:machine-coding` | Machine Coding status string |

- Sample questions load only when `itp:questions` does not exist (first visit).
- If the user deletes every question, an empty list is saved and stays empty after refresh.
- Invalid JSON, a non-array value, or malformed items are sanitized or replaced with defaults instead of crashing the app.
- To reset the app, clear the site's LocalStorage in the browser DevTools and refresh.

## Assumptions and limitations

- Data is stored per browser and per device. There is no sync, login or backend.
- Clearing browser data erases progress.
- Filters reset when switching between the Dashboard and Questions pages.
- Dates are shown in the browser's local format.
- "Interview questions" in the dashboard means the Git & GitHub and Technical categories combined.

## Deployment

The project is a static Vite app and works on Vercel.

**Vercel:** push the repository to GitHub, choose _Add New Project_, import the repository, keep the detected Vite settings (build command `npm run build`, output directory `dist`), and deploy.

*