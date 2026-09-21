import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskDetails.css';
import '../styles/Forms.css';

/**
 * TaskDetailsPage Component
 * Demonstrates:
 * 1. Dynamic Routing & URL Parameters using useParams()
 * 2. Updating and Deleting specific task records
 * 3. Programmatic Navigation using useNavigate()
 */
const TaskDetailsPage = () => {
  // Reading URL Parameter from React Router
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask, toggleComplete } = useTasks();

  const task = getTaskById(taskId);

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(
    task || {
      title: '',
      description: '',
      priority: 'Medium',
      category: 'Work',
      due: '',
      status: 'Pending'
    }
  );

  if (!task) {
    return (
      <div className="task-details-wrapper" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '12px' }}>
          ⚠️ Task Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          No task exists with identifier <code style={{ color: 'var(--primary)' }}>{taskId}</code>.
        </p>
        <Link to="/tasks" className="btn-primary-action" style={{ width: 'fit-content', margin: '0 auto' }}>
          ← Back to Tasks Directory
        </Link>
      </div>
    );
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateTask(taskId, editFormData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      deleteTask(taskId);
      navigate('/tasks');
    }
  };

  const isCompleted = task.status === 'Completed';

  return (
    <div className="task-details-wrapper">
      <div className="details-top-nav">
        <Link to="/tasks" className="btn-back-link">
          ← Back to All Tasks
        </Link>

        <span className="details-task-id">ID: {task.id}</span>
      </div>

      <div className="details-card">
        {/* Header Badges */}
        <div className="details-header-row">
          <div className="details-badges">
            <span className={`badge-priority ${task.priority.toLowerCase()}`}>
              ● {task.priority} Priority
            </span>
            <span className="badge-category">📂 {task.category}</span>
          </div>

          <span className={`badge-status ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
            {task.status}
          </span>
        </div>

        {/* View Mode vs Edit Mode */}
        {!isEditing ? (
          <>
            <h1 className="details-title">{task.title}</h1>

            <div className="details-meta-grid">
              <div className="meta-box">
                <span className="meta-label">📅 Target Due Date</span>
                <span className="meta-val" style={{ color: 'var(--accent-amber)' }}>{task.due}</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">📊 Current Status</span>
                <span className="meta-val">{task.status}</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">🕒 Created On</span>
                <span className="meta-val">{task.createdAt}</span>
              </div>
            </div>

            <div className="details-body">
              <h4>Task Description &amp; Scope</h4>
              <p className="details-description-text">{task.description}</p>
            </div>

            {/* Action Row */}
            <div className="details-actions-row">
              <div className="actions-left">
                <button
                  type="button"
                  className="btn-toggle-completion"
                  onClick={() => toggleComplete(task.id)}
                >
                  {isCompleted ? '↩ Reopen as Pending' : '✓ Mark as Completed'}
                </button>
                <button
                  type="button"
                  className="btn-edit-task"
                  onClick={() => {
                    setEditFormData(task);
                    setIsEditing(true);
                  }}
                >
                  ✏️ Edit Task
                </button>
              </div>

              <div className="actions-right">
                <button
                  type="button"
                  className="btn-delete-task"
                  onClick={handleDelete}
                >
                  🗑️ Delete Task
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Inline Edit Form */
          <form className="task-form" onSubmit={handleSaveEdit}>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>✏️ Edit Task Details</h2>

            <div className="form-group">
              <label htmlFor="edit-title" className="form-label">Task Title</label>
              <input
                id="edit-title"
                name="title"
                type="text"
                className="form-input"
                value={editFormData.title}
                onChange={handleEditChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-desc" className="form-label">Description</label>
              <textarea
                id="edit-desc"
                name="description"
                className="form-textarea"
                value={editFormData.description}
                onChange={handleEditChange}
                required
              ></textarea>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="edit-priority" className="form-label">Priority</label>
                <select
                  id="edit-priority"
                  name="priority"
                  className="form-select"
                  value={editFormData.priority}
                  onChange={handleEditChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-status" className="form-label">Status</label>
                <select
                  id="edit-status"
                  name="status"
                  className="form-select"
                  value={editFormData.status}
                  onChange={handleEditChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="edit-category" className="form-label">Category</label>
                <select
                  id="edit-category"
                  name="category"
                  className="form-select"
                  value={editFormData.category}
                  onChange={handleEditChange}
                >
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Development">Development</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-due" className="form-label">Due Date</label>
                <input
                  id="edit-due"
                  name="due"
                  type="text"
                  className="form-input"
                  value={editFormData.due}
                  onChange={handleEditChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions-row">
              <button
                type="button"
                className="btn-form-cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-form-submit">
                💾 Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsPage;

