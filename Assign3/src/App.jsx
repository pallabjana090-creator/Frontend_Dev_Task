import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import DirectoryControls from './components/DirectoryControls';
import EmployeeCard from './components/EmployeeCard';
import EmployeeModal from './components/EmployeeModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Footer from './components/Footer';
import { initialEmployees, farmDepartments } from './data/farmEmployeesData';
import './styles/index.css';

/**
 * Main Application Component for Assignment 3
 * Demonstrates:
 * 1. useState() for managing all dynamic state:
 *    - employees list
 *    - modal visibility
 *    - employee editing payload
 *    - employee deletion candidate
 *    - search query
 *    - active department filter
 *    - feedback toast notifications
 * 2. Event Handling (Form submissions, clicks, input changes)
 * 3. Conditional Rendering (Modals, empty states, notifications)
 */
function App() {
  // 1. Core State
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // 2. Modal & Interaction State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // 3. Notification Toast State
  const [notification, setNotification] = useState(null);

  // Utility to show temporary toast notification
  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Filtered employees calculation
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // Department Filter
      const matchesDept =
        selectedDepartment === 'All' || emp.department === selectedDepartment;

      // Search Query across Name, Employee ID, or Phone
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        emp.name.toLowerCase().includes(query) ||
        emp.employeeId.toLowerCase().includes(query) ||
        emp.phone.toLowerCase().includes(query);

      return matchesDept && matchesSearch;
    });
  }, [employees, searchTerm, selectedDepartment]);

  // Open modal for Adding a new employee
  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  // Open modal for Editing an existing employee
  const handleOpenEditModal = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmployeeToEdit(null);
  };

  // Save (Add or Update) Employee Handler
  const handleSaveEmployee = (savedEmployee) => {
    if (employeeToEdit) {
      // Edit existing employee in state
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === savedEmployee.id ? savedEmployee : emp))
      );
      triggerNotification(`✅ Employee "${savedEmployee.name}" updated successfully!`, 'success');
    } else {
      // Add new employee to state
      setEmployees((prev) => [savedEmployee, ...prev]);
      triggerNotification(`🎉 New employee "${savedEmployee.name}" (${savedEmployee.employeeId}) added successfully!`, 'success');
    }
    handleCloseModal();
  };

  // Prompt delete confirmation
  const handlePromptDelete = (employee) => {
    setDeleteCandidate(employee);
  };

  // Confirm and delete employee from state
  const handleConfirmDelete = (id) => {
    const target = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    setDeleteCandidate(null);
    triggerNotification(`🗑️ Employee "${target ? target.name : 'Record'}" deleted.`, 'danger');
  };

  // Cancel delete prompt
  const handleCancelDelete = () => {
    setDeleteCandidate(null);
  };

  // Reset filters helper
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All');
  };

  return (
    <div className="app-container">
      {/* Header with live Employee Counts */}
      <Header
        totalEmployees={employees.length}
        filteredCount={filteredEmployees.length}
        departmentCount={farmDepartments.length}
      />

      <main className="main-content">
        {/* Conditional Rendering: Notification Toast */}
        {notification && (
          <div className={`toast-banner ${notification.type}`}>
            <span>{notification.message}</span>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => setNotification(null)}
              aria-label="Dismiss message"
            >
              ✕
            </button>
          </div>
        )}

        {/* Directory Search, Department Filter, and Add Trigger */}
        <DirectoryControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          onOpenAddModal={handleOpenAddModal}
          totalCount={employees.length}
          filteredCount={filteredEmployees.length}
        />

        {/* Conditional Rendering: Grid of Employees OR Empty State */}
        {filteredEmployees.length > 0 ? (
          <div className="employee-grid">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleOpenEditModal}
                onDelete={handlePromptDelete}
              />
            ))}
          </div>
        ) : (
          <div className="empty-directory">
            <span className="empty-icon">🌾</span>
            <h3>No Farm Employees Found</h3>
            <p>
              No records matched your search for <strong>"{searchTerm || selectedDepartment}"</strong>.
              Try adjusting your query or reset the filters.
            </p>
            <button
              type="button"
              className="btn-reset-filters"
              onClick={handleResetFilters}
            >
              🔄 Reset Search &amp; Filters
            </button>
          </div>
        )}
      </main>

      {/* Conditional Rendering: Add / Edit Employee Modal */}
      {isModalOpen && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEmployee}
          employeeToEdit={employeeToEdit}
        />
      )}

      {/* Conditional Rendering: Delete Confirmation Dialog */}
      {deleteCandidate && (
        <DeleteConfirmModal
          isOpen={Boolean(deleteCandidate)}
          employee={deleteCandidate}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

