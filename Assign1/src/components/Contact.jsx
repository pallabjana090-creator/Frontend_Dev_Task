import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Reset form after short delay simulation
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 500);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">Contact Information</h2>
          <p className="section-description">
            Have a project inquiry, internship opportunity, or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <div className="contact-wrapper">
          {/* Contact Details Card */}
          <div className="contact-info-card">
            <h3 className="contact-info-title">Let's build something remarkable.</h3>
            <p className="contact-info-subtitle">
              I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon-box">📧</div>
                <div className="info-details">
                  <span className="info-label">Email</span>
                  <a href="mailto:alex.morgan.dev@example.com" className="info-value">
                    alex.morgan.dev@example.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">📱</div>
                <div className="info-details">
                  <span className="info-label">Phone</span>
                  <a href="tel:+15551234567" className="info-value">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">📍</div>
                <div className="info-details">
                  <span className="info-label">Location</span>
                  <span className="info-value">San Francisco, CA (Open to Remote)</span>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn"
                aria-label="GitHub Profile"
              >
                🐙
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn"
                aria-label="LinkedIn Profile"
              >
                💼
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn"
                aria-label="Twitter Profile"
              >
                🐦
              </a>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="contact-form-card">
            {submitted && (
              <div className="form-alert form-alert-success" style={{ marginBottom: '20px' }}>
                ✅ Thank you! Your message has been sent successfully. I'll get back to you soon.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="Project Collaboration / Inquiries"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

