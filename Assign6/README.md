# Assignment 6: Task Manager with Routing

A comprehensive single-page Task Manager application in React demonstrating **React Router v6**, **Nested Routes**, **Dynamic Routes (`useParams`)**, **Programmatic Navigation (`useNavigate`)**, and **Protected Routes**.

---

## 📋 Problem Statement & Requirements Met

### 1. Task Data Fields
Every task maintains:
- **Description**: Detailed description of objectives and scope.
- **Priority**: `High` (Rose), `Medium` (Amber), `Low` (Emerald).
- **Category**: `Work`, `Study`, `Development`, `Health`, `Finance`, `Personal`.
- **Due Date**: Formatted date string (e.g. `28 Aug 2026`).
- **Status**: `Pending`, `In Progress`, `Completed`.

---

### 2. All 5 Required Pages Implemented:
1. **📊 Dashboard (`/dashboard`)**:
   - High-level metric statistics (Total Tasks, In Progress, Completed, High Priority).
   - Category distribution analysis.
   - Quick action shortcuts to create or inspect tasks.
2. **📑 Tasks (`/tasks`)**:
   - Directory of tasks with real-time category filtering, priority tags, and keyword search.
   - Direct link to dynamic route `/tasks/:taskId`.
3. **➕ Add Task (`/add-task`)**:
   - Controlled creation form with validation.
   - On submission, executes programmatic redirection via `useNavigate()` to `/tasks`.
4. **🔍 Task Details (`/tasks/:taskId`)**:
   - **Dynamic Route & URL Parameter**: Uses `useParams()` to read the route's `:taskId`.
   - Displays full task metadata, status toggling, in-place edit mode, and task deletion.
5. **✅ Completed Tasks (`/completed`)**:
   - Dedicated view exclusively filtering finished tasks with restore/reopen and delete actions.

---

### 3. Core Routing Features Demonstrated:
- **URL Parameters**: Route `/tasks/:taskId` dynamically loads individual tasks with `useParams()`.
- **Navigation**:
  - `NavLink` with active highlighting (`.active`).
  - Breadcrumb navigation computed dynamically from current URL path (`useLocation()`).
  - Programmatic navigation via `useNavigate()`.
- **Protected Route (Basic)**:
  - `<ProtectedRoute />` wrapper checks authentication.
  - Redirects unauthenticated visitors to `/login`, preserving destination state (`state: { from: location }`).
  - Includes a 1-click Demo Sign In / Sign Out button in the navigation bar for instant testing.
- **Nested Routes**:
  - Root `<Layout />` with shared header, navigation links, and `<Outlet />`.

---

## 📁 Directory Layout

```
D:\Frontend_Dev_Task\Assign6\
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Shared shell with NavLink & Outlet
│   │   ├── ProtectedRoute.jsx  # Route guard redirecting to /login
│   │   └── TaskCard.jsx        # Reusable card with dynamic link
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth state for Protected Route testing
│   │   └── TaskContext.jsx     # Task CRUD state management
│   ├── pages/
│   │   ├── AddTaskPage.jsx     # Add Task form with useNavigate
│   │   ├── CompletedTasksPage.jsx # Archive of finished tasks
│   │   ├── DashboardPage.jsx   # Dashboard metrics overview
│   │   ├── LoginPage.jsx       # Public login page for auth testing
│   │   ├── NotFoundPage.jsx    # 404 catch-all
│   │   ├── TaskDetailsPage.jsx # Dynamic route reading useParams()
│   │   └── TasksPage.jsx       # Filterable & searchable tasks
│   ├── styles/
│   │   ├── Dashboard.css       # Stat cards & split view styling
│   │   ├── Forms.css           # Task form styling & priority pills
│   │   ├── index.css           # Global theme & reset
│   │   ├── Layout.css          # Navigation & breadcrumbs styling
│   │   ├── TaskDetails.css     # Task detail view styling
│   │   └── Tasks.css           # Filters bar & task cards styling
│   ├── App.jsx                 # Router tree & route declarations
│   └── main.jsx                # React root mounting entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run the Project

1. Open PowerShell / Command Prompt in Assign6:
   ```powershell
   cd D:\Frontend_Dev_Task\Assign6
   ```
2. Install dependencies (if needed):
   ```powershell
   npm install
   ```
3. Start development server:
   ```powershell
   npm run dev
   ```
4. Open the displayed URL (e.g. `http://localhost:3005`) in your browser to test navigation, dynamic task routing, and protected routes.

