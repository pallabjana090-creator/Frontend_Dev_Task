import React from 'react';

const SkillBadge = ({ name, level, icon, percentage }) => {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name-wrap">
          <span>{icon}</span> {name}
        </span>
        <span className="skill-level-text">{level}</span>
      </div>
      <div className="skill-bar-track">
        <div 
          className="skill-bar-fill" 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default SkillBadge;

