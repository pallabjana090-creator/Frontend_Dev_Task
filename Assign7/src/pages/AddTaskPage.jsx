import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import '../styles/Forms.css';

/**
 * AddTaskPage Component
 * Form to create a new task with validation
 * Demonstrates programmatic navigation via useNavigate()
 */
const AddTaskPage = () => {
  const navigate = useNavigate();
  const { createTask } = useTasks();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Work',
    due: '28 Aug 2026',
    status: 'Pending'
  });

  const [formError, setFormError] = useState('');

  const categories = ['Work', 'Study', 'Development', 'Health', 'Finance', 'Personal'];
  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['Pending', 'In Progress', 'Completed'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formError) setFormError('');
  };

  const handlePrioritySelect = (priority) => {
    setFormData((prev) => ({ ...prev, priority }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setFormError('Please enter a brief task title/headline.');
      return;
    }

    if (!formData.description.trim()) {
      setFormError('Please provide a task description.');
      return;
    }

    // Persist new task in TaskContext state
    createTask(formData);

    // Programmatic Navigation: redirect to /tasks list
    navigate('/tasks');
  };

  return (
    <div className="form-page-card">
      <div className="form-header">
        <h1>Create New Task</h1>
        <p>Define task deliverables, priority level, category, and target deadline.</p>
      </div>

      {formError && (
        <div style={{ padding: '12px 16px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.35)', borderRadius: '8px', color: '#fda4af', marginBottom: '20px', fontSize: '0.9rem' }}>
          ⚠️ {formError}
        </div>
      )}

      <form className="task-form" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">Task Title / Headline *</label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-input"
            placeholder="e.g. Prepare Organic Chemistry Report"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description *</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            placeholder="Detail the actionable steps, references, or success criteria..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Category & Status */}
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category *</label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">Initial Status *</label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date & Priority Selector */}
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="due" className="form-label">Due Date *</label>
            <input
              id="due"
              name="due"
              type="text"
              className="form-input"
              placeholder="e.g. 28 Aug 2026"
              value={formData.due}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Priority Level *</label>
            <div className="priority-selector-group">
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`priority-option-btn ${formData.priority === p ? `active ${p.toLowerCase()}` : ''}`}
                  onClick={() => handlePrioritySelect(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions-row">
          <button
            type="button"
            className="btn-form-cancel"
            onClick={() => navigate('/tasks')}
          >
            Cancel
          </button>

          <button type="submit" className="btn-form-submit">
            Save &amp; Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;

