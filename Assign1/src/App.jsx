import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <Navbar />

      <main>
        {/* Header / Hero Section */}
        <Header />

        {/* About Me Section */}
        <About />

        {/* Education Section */}
        <Education />

        {/* Skills Section */}
        <Skills />

        {/* Contact Information Section */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;

