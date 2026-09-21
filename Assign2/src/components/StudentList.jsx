import React from 'react';
import StudentCard from './StudentCard';
import '../styles/StudentList.css';

/**
 * StudentList Component
 * Receives all data, sorting criteria, and handler functions through Props:
 * @param {Array} students - Array of student records to display
 * @param {string} sortOrder - Current CGPA sorting option ('desc', 'asc', 'default')
 * @param {Function} onSortChange - Callback function triggered when sort changes
 * @param {string} selectedDept - Current department filter
 * @param {Function} onDeptChange - Callback function for department filter
 * @param {string} searchTerm - Current search keyword
 * @param {Function} onSearchChange - Callback function for search keyword
 * @param {Array} departments - List of available departments
 */
const StudentList = ({
  students,
  sortOrder,
  onSortChange,
  selectedDept,
  onDeptChange,
  searchTerm,
  onSearchChange,
  departments
}) => {
  return (
    <section className="student-portal-section">
      {/* Interactive Controls Bar */}
      <div className="portal-controls">
        <div className="controls-top">
          <div className="controls-heading">
            <h2>Enrolled Students Directory</h2>
            <p>Manage, inspect, and sort academic records across departments.</p>
          </div>
          <div className="count-badge">
            Showing {students.length} Student{students.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="controls-bar">
          {/* CGPA Sorting Mechanism - Explicit Requirement */}
          <div className="control-group">
            <label className="control-label" htmlFor="cgpa-sort">
              📊 Sort by CGPA
            </label>
            <div className="sort-pills">
              <button
                type="button"
                className={`sort-pill-btn ${sortOrder === 'desc' ? 'active' : ''}`}
                onClick={() => onSortChange('desc')}
                title="Sort Highest to Lowest CGPA"
              >
                High → Low (↓)
              </button>
              <button
                type="button"
                className={`sort-pill-btn ${sortOrder === 'asc' ? 'active' : ''}`}
                onClick={() => onSortChange('asc')}
                title="Sort Lowest to Highest CGPA"
              >
                Low → High (↑)
              </button>
              <button
                type="button"
                className={`sort-pill-btn ${sortOrder === 'default' ? 'active' : ''}`}
                onClick={() => onSortChange('default')}
                title="Reset to Default Order"
              >
                Reset (Default)
              </button>
            </div>
          </div>

          {/* Department Filter */}
          <div className="control-group">
            <label className="control-label" htmlFor="dept-filter">
              🏛️ Department Filter
            </label>
            <select
              id="dept-filter"
              className="control-select"
              value={selectedDept}
              onChange={(e) => onDeptChange(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Name or Roll Number */}
          <div className="control-group">
            <label className="control-label" htmlFor="search-input">
              🔍 Search Student
            </label>
            <input
              id="search-input"
              type="text"
              className="control-input"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="students-grid">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              rollNumber={student.rollNumber}
              department={student.department}
              semester={student.semester}
              cgpa={student.cgpa}
              photo={student.photo}
            />
          ))
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📂</span>
            <h3>No Students Found</h3>
            <p>
              No student records matched your current search query or department filter. Try resetting your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentList;

