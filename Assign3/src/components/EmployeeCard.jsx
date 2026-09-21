import React from 'react';
import '../styles/EmployeeCard.css';

/**
 * EmployeeCard Component
 * Displays all 7 required farm employee fields:
 * 1. Name
 * 2. Employee ID
 * 3. Department Name
 * 4. Gender
 * 5. Phone Number
 * 6. Local address
 * 7. Permanent address
 * Plus Edit and Delete event triggers.
 */
const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const {
    name,
    employeeId,
    department,
    gender,
    phone,
    localAddress,
    permanentAddress
  } = employee;

  return (
    <div className="employee-card">
      <div className="card-header-row">
        <span className="employee-id-pill">🆔 {employeeId}</span>
        <span className="department-badge" title={department}>
          🌾 {department}
        </span>
      </div>

      <h3 className="employee-name">
        {name}
        <span className="gender-indicator">{gender}</span>
      </h3>

      <div className="card-divider"></div>

      <div className="employee-details-list">
        {/* Phone */}
        <div className="detail-item">
          <span className="detail-icon">📞</span>
          <div className="detail-content">
            <span className="detail-label">Phone Number</span>
            <span className="detail-val phone">{phone}</span>
          </div>
        </div>

        {/* Local Address */}
        <div className="detail-item">
          <span className="detail-icon">🏡</span>
          <div className="detail-content">
            <span className="detail-label">Local Address</span>
            <span className="detail-val">{localAddress}</span>
          </div>
        </div>

        {/* Permanent Address */}
        <div className="detail-item">
          <span className="detail-icon">📍</span>
          <div className="detail-content">
            <span className="detail-label">Permanent Address</span>
            <span className="detail-val">{permanentAddress}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons with Event Handlers */}
      <div className="card-actions">
        <button
          type="button"
          className="btn-card-action btn-edit"
          onClick={() => onEdit(employee)}
          aria-label={`Edit details for ${name}`}
        >
          ✏️ Edit Details
        </button>
        <button
          type="button"
          className="btn-card-action btn-delete"
          onClick={() => onDelete(employee)}
          aria-label={`Delete record of ${name}`}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;

