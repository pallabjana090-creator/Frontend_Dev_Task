import React, { useState } from 'react';
import '../styles/StudentCard.css';

/**
 * Reusable StudentCard Component
 * Displays individual student details passed via props:
 * @param {string} name - Student full name
 * @param {string} rollNumber - Student unique roll/registration number
 * @param {string} department - Academic department name
 * @param {string} semester - Current academic semester
 * @param {number} cgpa - Cumulative Grade Point Average
 * @param {string} photo - URL string of student photo
 */
const StudentCard = ({ name, rollNumber, department, semester, cgpa, photo }) => {
  const [imgError, setImgError] = useState(false);

  // Determine dynamic CGPA badge styling and label based on performance tier
  const getPerformanceTier = (score) => {
    if (score >= 9.0) {
      return {
        className: 'tier-outstanding',
        label: 'Outstanding ⭐'
      };
    }
    if (score >= 8.0) {
      return {
        className: 'tier-excellent',
        label: 'Distinction 🎯'
      };
    }
    return {
      className: 'tier-good',
      label: 'Good Standing 👍'
    };
  };

  const tier = getPerformanceTier(cgpa);

  // Fallback UI avatar in case remote image fails or is unavailable
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=200&bold=true`;

  return (
    <div className="student-card">
      <div className="card-top-bar">
        <span className="roll-badge">🆔 {rollNumber}</span>
        <span className="semester-badge">📅 {semester}</span>
      </div>

      <div className="card-profile">
        <div className="photo-wrapper">
          <img
            src={imgError ? fallbackAvatar : photo}
            alt={`${name}'s photo`}
            className="student-photo"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>

        <div className="profile-info">
          <h3 className="student-name">{name}</h3>
          <span className="department-tag">
            <span>📚</span> {department}
          </span>
        </div>
      </div>

      <div className="card-divider"></div>

      <div className="card-academic">
        <div className="cgpa-label-group">
          <span className="cgpa-label">Academic CGPA</span>
          <span className="cgpa-tier-text">{tier.label}</span>
        </div>

        <div className={`cgpa-badge ${tier.className}`}>
          {cgpa.toFixed(2)}
          <span className="cgpa-scale">/ 10</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;

