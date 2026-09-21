import React from 'react';

const EducationCard = ({ degree, institution, period, score, description, courses }) => {
  return (
    <div className="education-card">
      <div className="timeline-dot"></div>
      <div className="education-card-body">
        <div className="edu-header">
          <div>
            <h3 className="edu-degree">{degree}</h3>
            <div className="edu-institution">
              <span>🏛️</span> {institution}
            </div>
          </div>
          <span className="edu-period">{period}</span>
        </div>

        <p className="edu-desc">{description}</p>
        
        {score && (
          <p className="edu-desc" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            🎯 Grade / Standing: <span style={{ color: 'var(--secondary)' }}>{score}</span>
          </p>
        )}

        {courses && courses.length > 0 && (
          <div className="edu-tags">
            {courses.map((course, idx) => (
              <span key={idx} className="edu-tag">
                {course}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationCard;

