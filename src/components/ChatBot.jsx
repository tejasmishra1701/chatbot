import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const TypingDots = () => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return <span>{dots}</span>;
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I\'m Logan! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Collapse chat when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://tejasworking.app.n8n.cloud/webhook/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      // Now data is { reply: "..." }
      let botReply = data.reply || "Sorry, I didn't get that.";
      setMessages(msgs => [...msgs, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-widget">
      {!open && (
        <button className="chatbot-fab" onClick={() => setOpen(true)} aria-label="Open chat">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#185adb"/>
            <path d="M7 10h10M7 14h7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      {open && (
        <div className="chatbot-container" ref={chatRef}>
          <div className="chatbot-box">
            <div className="chatbot-header">
              <span>Pixora Chat</span>
              <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">
                ×
              </button>
            </div>
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chatbot-message chatbot-message-${msg.sender}`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="chatbot-message chatbot-message-bot">Typing
                  <TypingDots />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chatbot-input-row">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                disabled={loading}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;