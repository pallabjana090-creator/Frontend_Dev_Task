import React from 'react';
import { farmDepartments } from '../data/farmEmployeesData';
import '../styles/EmployeeDirectory.css';

/**
 * DirectoryControls Component
 * Controls for:
 * 1. Real-time Search by Name, Employee ID, or Phone
 * 2. Department Filtering (select & quick pills)
 * 3. Add Employee Action Trigger
 * 4. Dynamic Count Display
 */
const DirectoryControls = ({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  onOpenAddModal,
  totalCount,
  filteredCount
}) => {
  return (
    <div className="directory-controls-panel">
      <div className="controls-top-row">
        <div className="controls-intro">
          <h2>Farm Workforce Directory</h2>
          <p>
            Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> registered staff members
          </p>
        </div>

        {/* Add Employee Trigger */}
        <button
          type="button"
          className="btn-add-employee"
          onClick={onOpenAddModal}
        >
          <span>➕</span> Add Farm Employee
        </button>
      </div>

      <div className="controls-filter-bar">
        {/* Search Bar */}
        <div className="search-box-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, ID (e.g. FRM-101), or phone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Department Filter Dropdown */}
        <div className="dept-filter-group">
          <select
            className="dept-select"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="All">All Farm Departments ({totalCount})</option>
            {farmDepartments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Department Filter Pills */}
      <div className="dept-pills-row">
        <button
          type="button"
          className={`dept-pill ${selectedDepartment === 'All' ? 'active' : ''}`}
          onClick={() => onDepartmentChange('All')}
        >
          All Departments
        </button>
        {farmDepartments.map((dept, idx) => (
          <button
            key={idx}
            type="button"
            className={`dept-pill ${selectedDepartment === dept ? 'active' : ''}`}
            onClick={() => onDepartmentChange(dept)}
          >
            {dept}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DirectoryControls;

