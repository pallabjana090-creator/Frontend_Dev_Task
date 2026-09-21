import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import '../styles/Tasks.css';

/**
 * CompletedTasksPage Component
 * Displays tasks with status 'Completed'
 * Demonstrates routing to dedicated archive views
 */
const CompletedTasksPage = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  return (
    <div>
      <div className="tasks-page-header">
        <div>
          <h1 className="page-title">Completed Tasks Archive</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Review finished objectives, milestones, and achievements ({completedTasks.length} tasks completed)
          </p>
        </div>

        <Link to="/tasks" className="btn-status-toggle" style={{ padding: '10px 18px', fontSize: '0.9rem' }}>
          ← View Active Tasks
        </Link>
      </div>

      {completedTasks.length > 0 ? (
        <div className="tasks-grid">
          {completedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="empty-tasks">
          <span className="empty-tasks-icon">📋</span>
          <h3>No completed tasks yet</h3>
          <p>Complete tasks from your Tasks Directory to view them archived here.</p>
          <Link to="/tasks" className="btn-primary-action" style={{ display: 'inline-block', marginTop: '16px' }}>
            Go to Tasks
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompletedTasksPage;

