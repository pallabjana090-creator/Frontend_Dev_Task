import React from 'react';
import EducationCard from './EducationCard';
import '../styles/Education.css';

const Education = () => {
  const educationList = [
    {
      degree: 'Bachelor of Technology in Computer Science & Engineering',
      institution: 'State Technical University',
      period: '2022 - 2026 (Expected)',
      score: '8.85 / 10 CGPA',
      description: 'Specializing in Web Technologies, Software Engineering, Data Structures & Algorithms, and Cloud Computing. Active member of the University Developer Club.',
      courses: ['Data Structures', 'Web Development', 'Operating Systems', 'Database Systems', 'Object Oriented Programming']
    },
    {
      degree: 'Higher Secondary Education (Class XII - Science)',
      institution: 'Delhi Public Senior Secondary School',
      period: '2020 - 2022',
      score: '93.4%',
      description: 'Focused on Physics, Chemistry, Mathematics, and Computer Science (Python & SQL). Secured distinction in Computer Science.',
      courses: ['Physics', 'Mathematics', 'Computer Science', 'Chemistry']
    },
    {
      degree: 'Secondary School Certificate (Class X)',
      institution: 'St. Xavier High School',
      period: '2019 - 2020',
      score: '94.8%',
      description: 'Comprehensive secondary school education with academic excellence awards in Science and Mathematics competitions.',
      courses: ['Mathematics', 'Science', 'Social Studies', 'English']
    }
  ];

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Academic Background</span>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-description">
            My formal educational milestones and academic training that built my technical foundation.
          </p>
        </div>

        <div className="education-timeline">
          {educationList.map((item, index) => (
            <EducationCard
              key={index}
              degree={item.degree}
              institution={item.institution}
              period={item.period}
              score={item.score}
              description={item.description}
              courses={item.courses}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

