import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import '../styles/Tasks.css';

/**
 * TasksPage Component
 * Full interactive directory of tasks with:
 * - Search by title or description
 * - Category filter
 * - Priority filter
 * - Dynamic route links to Task Details
 */
const TasksPage = () => {
  const { tasks } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = ['All', 'Work', 'Study', 'Development', 'Health', 'Finance'];
  const priorities = ['All', 'High', 'Medium', 'Low'];
  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Search Query
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      // 2. Category
      const matchesCat = categoryFilter === 'All' || task.category === categoryFilter;

      // 3. Priority
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

      // 4. Status
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;

      return matchesSearch && matchesCat && matchesPriority && matchesStatus;
    });
  }, [tasks, searchTerm, categoryFilter, priorityFilter, statusFilter]);

  return (
    <div>
      <div className="tasks-page-header">
        <div>
          <h1 className="page-title">Tasks Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Showing {filteredTasks.length} of {tasks.length} recorded tasks
          </p>
        </div>

        <Link to="/add-task" className="btn-primary-action">
          <span>➕</span> New Task
        </Link>
      </div>

      {/* Filter Controls Bar */}
      <div className="tasks-filter-bar">
        <input
          type="text"
          className="search-input-box"
          placeholder="Search by task title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by Category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              Category: {c}
            </option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          className="filter-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          aria-label="Filter by Priority"
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              Priority: {p}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by Status"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              Status: {s}
            </option>
          ))}
        </select>
      </div>

      {/* Tasks Grid */}
      {filteredTasks.length > 0 ? (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="empty-tasks">
          <span className="empty-tasks-icon">🔍</span>
          <h3>No matching tasks found</h3>
          <p>Try resetting your search query or changing filter parameters.</p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;

