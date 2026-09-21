import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import '../styles/Dashboard.css';

/**
 * DashboardPage Component
 * Provides high-level operational overview of all tasks:
 * - Metrics: Total Tasks, In Progress, Completed, High Priority
 * - Category breakdown distribution
 * - Priority tasks preview
 */
const DashboardPage = () => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'High' && t.status !== 'Completed').length;

  const categories = ['Work', 'Study', 'Development', 'Health', 'Finance'];

  // Upcoming priority tasks
  const pendingHighPriority = tasks
    .filter((t) => t.status !== 'Completed')
    .slice(0, 3);

  return (
    <div className="dashboard-grid">
      {/* Hero Welcome Row */}
      <div className="dashboard-hero">
        <div className="hero-heading">
          <h1>Productivity Dashboard</h1>
          <p>Track project roadmaps, deadlines, and milestone achievements.</p>
        </div>

        <Link to="/add-task" className="btn-primary-action">
          <span>➕</span> Create New Task
        </Link>
      </div>

      {/* High-Level Metric Stat Cards */}
      <div className="stats-cards-row">
        <div className="stat-card">
          <div className="stat-icon-frame total">📑</div>
          <div className="stat-details">
            <span className="stat-value">{totalTasks}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-frame progress">⚡</div>
          <div className="stat-details">
            <span className="stat-value">{inProgressTasks}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-frame completed">✅</div>
          <div className="stat-details">
            <span className="stat-value">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-frame high">🔥</div>
          <div className="stat-details">
            <span className="stat-value">{highPriorityTasks}</span>
            <span className="stat-label">High Priority</span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Active Priorities & Category Distribution */}
      <div className="dashboard-split">
        {/* Left Column: Active Priority Tasks */}
        <div className="section-card">
          <div className="section-header-row">
            <h2 className="section-title">Active Priority Tasks</h2>
            <Link to="/tasks" className="link-subtle">
              View All ({tasks.filter((t) => t.status !== 'Completed').length}) →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pendingHighPriority.length > 0 ? (
              pendingHighPriority.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '24px 0' }}>
                All high priority tasks completed! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Category Breakdown */}
        <div className="section-card">
          <div className="section-header-row">
            <h2 className="section-title">Categories Overview</h2>
            <Link to="/tasks" className="link-subtle">
              Filter by Category →
            </Link>
          </div>

          <div className="categories-list">
            {categories.map((cat) => {
              const catCount = tasks.filter((t) => t.category === cat).length;
              const catCompleted = tasks.filter((t) => t.category === cat && t.status === 'Completed').length;
              return (
                <div key={cat} className="category-stat-row">
                  <div>
                    <strong style={{ color: '#ffffff' }}>{cat}</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      {catCompleted} of {catCount} completed
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {catCount} Tasks
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

