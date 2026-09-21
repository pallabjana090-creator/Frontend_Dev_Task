import React from 'react';
import '../styles/Modal.css';

/**
 * DeleteConfirmModal Component
 * Confirms user intent before removing an employee from state:
 * - Conditional rendering controlled by parent state
 * - Event handling for confirm & cancel
 */
const DeleteConfirmModal = ({ isOpen, employee, onConfirm, onCancel }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel} role="alertdialog" aria-modal="true">
      <div className="modal-content delete-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="delete-dialog-icon">⚠️</div>
        <h3>Confirm Employee Deletion</h3>
        <p>
          Are you sure you want to delete the record of{' '}
          <strong style={{ color: '#ffffff' }}>{employee.name}</strong> ({employee.employeeId})? 
          This action will remove their entry from the farm directory.
        </p>

        <div className="delete-dialog-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-confirm-delete"
            onClick={() => onConfirm(employee.id)}
          >
            🗑️ Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

