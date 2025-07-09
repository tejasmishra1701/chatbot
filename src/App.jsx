import { useEffect } from 'react';
import './App.css';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import ChatBot from './components/ChatBot'

function App() {
  

  return (
    <>  
      <header className="header">
        <div className="container">
          <h1 className="logo">Pixora</h1>
          <nav>
            <ul className="nav-list">
              <li>Home</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Empowering Digital Innovation</h2>
          <p>
            Pixora is your partner for Web & App Development, UI/UX Design, AI-Powered Workflow Automation, and AI Agent Integration.
          </p>
          <a href="#contact" className="cta-btn">Get Started</a>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h3>Our Services</h3>
          <div className="service-grid">
            <div className="service-card">
              <h4>Web Development</h4>
              <p>Modern, scalable websites tailored to your business needs.</p>
            </div>
            <div className="service-card">
              <h4>App Development</h4>
              <p>Robust mobile and desktop applications for every platform.</p>
            </div>
            <div className="service-card">
              <h4>UI/UX Design</h4>
              <p>Intuitive and engaging user experiences that delight.</p>
            </div>
            <div className="service-card">
              <h4>AI Workflow Automation</h4>
              <p>Streamline your processes with intelligent automation solutions.</p>
            </div>
            <div className="service-card">
              <h4>AI Agent Development</h4>
              <p>Custom AI agents to enhance productivity and customer engagement.</p>
            </div>
            <div className="service-card">
              <h4>AI Integration</h4>
              <p>Seamless integration of AI into your existing systems.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <h3>About Pixora</h3>
          <p>
            At Pixora, we blend creativity, technology, and intelligence to deliver solutions that drive growth and efficiency. Our team is passionate about helping businesses harness the power of digital innovation.
          </p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <h3>Contact Us</h3>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="How can we help you?" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Pixora. All rights reserved.</p>
        </div>
      </footer>
      <ChatBot />
    </>
  )
}

export default App
