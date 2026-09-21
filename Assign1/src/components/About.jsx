import React from 'react';
import '../styles/About.css';

const About = () => {
  const highlights = [
    {
      icon: '💡',
      num: '15+',
      title: 'Projects Built',
      desc: 'Web applications with React & JavaScript'
    },
    {
      icon: '🎓',
      num: '3.8',
      title: 'Academic GPA',
      desc: 'B.Tech in Computer Science'
    },
    {
      icon: '⚡',
      num: '100%',
      title: 'Modern Stack',
      desc: 'ES6+, Vite, Responsive CSS, Git'
    },
    {
      icon: '🎯',
      num: '24/7',
      title: 'Problem Solver',
      desc: 'Continuous learner & detail-oriented'
    }
  ];

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">About Me</span>
          <h2 className="section-title">Crafting Experiences with Code</h2>
          <p className="section-description">
            Here's a glance into who I am, what drives my passion for web development, and how I create impact.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <h3>Turning complex logic into seamless visual experiences.</h3>
            <p>
              I am an aspiring Frontend Developer with a deep interest in building intuitive, interactive, and responsive web applications. My journey started with exploring core web technologies, which quickly evolved into building scalable components using React and JSX.
            </p>
            <p>
              I take pride in writing clean, maintainable code, adhering to semantic HTML principles, and applying modern CSS techniques for fully responsive layouts. Whether working individually or collaborating in teams, I enjoy solving problems and turning ideas into usable digital solutions.
            </p>
            <p>
              When I'm not coding, you can find me exploring open-source software, reading tech articles, or sketching out UI wireframes.
            </p>
          </div>

          <div className="about-highlights">
            {highlights.map((item, index) => (
              <div key={index} className="highlight-card">
                <span className="highlight-icon">{item.icon}</span>
                <span className="highlight-num">{item.num}</span>
                <span className="highlight-title">{item.title}</span>
                <span className="highlight-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

