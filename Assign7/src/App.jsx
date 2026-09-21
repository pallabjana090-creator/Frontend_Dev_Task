import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/index.css';

/**
 * Main Application Component for Assignment 7: Authentication System
 * Features:
 * 1. Login with validation & password strength meter
 * 2. Simulated JWT Token generator with 3-part base64 encoding in LocalStorage
 * 3. Remember User persistence via LocalStorage
 * 4. Protected Routes (guards /dashboard, /tasks, /add-task, /completed)
 * 5. Logout with LocalStorage cleanup
 * 6. Live JWT Token Inspector diagnostics modal
 */
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Authentication Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes Group guarded by ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                {/* Index redirect to /dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />

                {/* Page 1: Protected Dashboard */}
                <Route path="dashboard" element={<DashboardPage />} />

                {/* Page 2: Tasks List */}
                <Route path="tasks" element={<TasksPage />} />

                {/* Page 3: Task Details (Dynamic Route with URL Parameter) */}
                <Route path="tasks/:taskId" element={<TaskDetailsPage />} />

                {/* Page 4: Add Task */}
                <Route path="add-task" element={<AddTaskPage />} />

                {/* Page 5: Completed Tasks */}
                <Route path="completed" element={<CompletedTasksPage />} />
              </Route>
            </Route>

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;

