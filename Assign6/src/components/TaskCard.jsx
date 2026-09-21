import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

/**
 * TaskCard Component
 * Displays task details with dynamic route Link to `/tasks/:taskId`
 */
const TaskCard = ({ task }) => {
  const { toggleComplete } = useTasks();

  const isCompleted = task.status === 'Completed';

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-card-header">
        <div className="task-badges-row">
          <span className={`badge-priority ${task.priority.toLowerCase()}`}>
            ● {task.priority}
          </span>
          <span className="badge-category">{task.category}</span>
        </div>

        <span className={`badge-status ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
          {task.status}
        </span>
      </div>

      <h3 className={`task-title ${isCompleted ? 'strike' : ''}`}>
        {task.title}
      </h3>

      <p className="task-description">{task.description}</p>

      <div className="task-card-footer">
        <div className="task-due-date">
          <span>📅 Due:</span>
          <span className="highlight">{task.due}</span>
        </div>

        <div className="task-action-links">
          <button
            type="button"
            className="btn-status-toggle"
            onClick={() => toggleComplete(task.id)}
            title={isCompleted ? 'Reopen task' : 'Mark complete'}
          >
            {isCompleted ? '↩ Restore' : '✓ Done'}
          </button>

          {/* Dynamic Route Link demonstrating URL Parameters */}
          <Link to={`/tasks/${task.id}`} className="link-task-details">
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

