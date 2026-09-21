import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/index.css';

/**
 * Main Application Component for Assignment 6: Task Manager with Routing
 * Demonstrates:
 * 1. React Router v6 BrowserRouter, Routes, Route, Navigate
 * 2. Nested Routes via Layout component with <Outlet />
 * 3. Dynamic Routes with URL Parameters (/tasks/:taskId)
 * 4. Protected Routes guard (<ProtectedRoute />)
 * 5. Programmatic and NavLink navigation
 */
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {/* Nested Route Shell with Shared Layout */}
            <Route path="/" element={<Layout />}>
              {/* Public Route */}
              <Route path="login" element={<LoginPage />} />

              {/* Protected Routes Group */}
              <Route element={<ProtectedRoute />}>
                {/* Index redirect to /dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />

                {/* Page 1: Dashboard */}
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

              {/* 404 Not Found Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;

