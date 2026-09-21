import React from 'react';
import SkillBadge from './SkillBadge';
import '../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      skills: [
        { name: 'React.js & JSX', level: 'Advanced', icon: '⚛️', percentage: 90 },
        { name: 'JavaScript (ES6+)', level: 'Advanced', icon: '📜', percentage: 88 },
        { name: 'HTML5 & Semantic Web', level: 'Expert', icon: '🌐', percentage: 95 },
        { name: 'CSS3 / Responsive Design', level: 'Advanced', icon: '💎', percentage: 92 },
        { name: 'Vite / Webpack', level: 'Intermediate', icon: '⚡', percentage: 80 }
      ]
    },
    {
      title: 'Backend & Data',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 'Intermediate', icon: '🟢', percentage: 75 },
        { name: 'Express.js', level: 'Intermediate', icon: '🚂', percentage: 70 },
        { name: 'REST APIs', level: 'Advanced', icon: '🔄', percentage: 85 },
        { name: 'MySQL / Relational DBs', level: 'Intermediate', icon: '🐬', percentage: 75 },
        { name: 'MongoDB', level: 'Intermediate', icon: '🍃', percentage: 72 }
      ]
    },
    {
      title: 'Programming & CS Core',
      icon: '🧠',
      skills: [
        { name: 'C / C++', level: 'Proficient', icon: '💻', percentage: 82 },
        { name: 'Data Structures & Algorithms', level: 'Proficient', icon: '🌲', percentage: 80 },
        { name: 'Object-Oriented Design', level: 'Advanced', icon: '🧩', percentage: 85 },
        { name: 'Git & GitHub', level: 'Advanced', icon: '🐙', percentage: 90 },
        { name: 'Problem Solving', level: 'Advanced', icon: '🎯', percentage: 88 }
      ]
    }
  ];

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">My Toolkit</span>
          <h2 className="section-title">Skills & Technical Competencies</h2>
          <p className="section-description">
            A comprehensive overview of the programming languages, libraries, frameworks, and dev tools I use.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, catIdx) => (
            <div key={catIdx} className="skills-category-card">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.title}</h3>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, sIdx) => (
                  <SkillBadge
                    key={sIdx}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    percentage={skill.percentage}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

