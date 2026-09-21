import React, { useState, useEffect } from 'react';
import { farmDepartments } from '../data/farmEmployeesData';
import '../styles/Modal.css';

/**
 * EmployeeModal Component
 * Handles both Adding and Editing Employee records:
 * - Controlled inputs with useState()
 * - Event handling for onChange, onSubmit, and onClose
 * - Conditional rendering of headers, button labels, and validation
 */
const EmployeeModal = ({ isOpen, onClose, onSave, employeeToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: farmDepartments[0],
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: ''
  });

  const [formError, setFormError] = useState('');

  // Synchronize form state whenever employeeToEdit prop changes
  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name || '',
        employeeId: employeeToEdit.employeeId || '',
        department: employeeToEdit.department || farmDepartments[0],
        gender: employeeToEdit.gender || 'Male',
        phone: employeeToEdit.phone || '',
        localAddress: employeeToEdit.localAddress || '',
        permanentAddress: employeeToEdit.permanentAddress || ''
      });
    } else {
      // Default blank values for new employee
      setFormData({
        name: '',
        employeeId: `FRM-${Math.floor(100 + Math.random() * 900)}`,
        department: farmDepartments[0],
        gender: 'Male',
        phone: '',
        localAddress: '',
        permanentAddress: ''
      });
    }
    setFormError('');
  }, [employeeToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formError) setFormError('');
  };

  // Handle form submission with event preventDefault & validation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormError('Please provide the employee full name.');
      return;
    }
    if (!formData.employeeId.trim()) {
      setFormError('Please enter a valid Employee ID.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Please enter a valid contact phone number.');
      return;
    }
    if (!formData.localAddress.trim()) {
      setFormError('Please specify the local residential address on or near the farm.');
      return;
    }
    if (!formData.permanentAddress.trim()) {
      setFormError('Please specify the permanent home address.');
      return;
    }

    onSave({
      ...formData,
      id: employeeToEdit ? employeeToEdit.id : Date.now()
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {employeeToEdit ? '✏️ Edit Farm Employee' : '➕ Register New Farm Employee'}
          </h2>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {formError && (
          <div style={{ margin: '16px 24px 0', padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '6px', color: '#f87171', fontSize: '0.88rem' }}>
            ⚠️ {formError}
          </div>
        )}

        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Row 1: Name & Employee ID */}
          <div className="form-grid-2">
            <div className="form-field">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="e.g. Ramesh Patel"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="employeeId" className="form-label">Employee ID *</label>
              <input
                id="employeeId"
                name="employeeId"
                type="text"
                className="form-input"
                placeholder="e.g. FRM-109"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Department & Gender */}
          <div className="form-grid-2">
            <div className="form-field">
              <label htmlFor="department" className="form-label">Department *</label>
              <select
                id="department"
                name="department"
                className="form-select"
                value={formData.department}
                onChange={handleChange}
                required
              >
                {farmDepartments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="gender" className="form-label">Gender *</label>
              <select
                id="gender"
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3: Phone */}
          <div className="form-field">
            <label htmlFor="phone" className="form-label">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input"
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 4: Local Address */}
          <div className="form-field">
            <label htmlFor="localAddress" className="form-label">Local Address (Farm / Living Quarters) *</label>
            <textarea
              id="localAddress"
              name="localAddress"
              className="form-textarea"
              placeholder="e.g. Staff Quarters Block C-14, North Farm Sector"
              value={formData.localAddress}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Row 5: Permanent Address */}
          <div className="form-field">
            <label htmlFor="permanentAddress" className="form-label">Permanent Address (Home Town / City) *</label>
            <textarea
              id="permanentAddress"
              name="permanentAddress"
              className="form-textarea"
              placeholder="e.g. House No. 22, Green Avenue, Ludhiana, Punjab"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Modal Action Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
            >
              {employeeToEdit ? '💾 Save Changes' : '✅ Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;

