import React, { useState } from 'react';

const Messages = () => {
  // Sample Data for Inbox
  const [activeMessageId, setActiveMessageId] = useState(1);
  const [messages] = useState([
    { id: 1, sender: 'Arjun Verma', subject: 'Inquiry about Silk Rug', preview: 'Is the 6x9 size available in blue?', time: '10:30 AM', status: 'unread', content: 'Hi, I saw your handmade silk rug. Is the 6x9 size available in the deep blue pattern? Also, do you ship to Delhi?' },
    { id: 2, sender: 'Sarah J.', subject: 'Order #1024 Update', preview: 'When will my order ship?', time: 'Yesterday', status: 'read', content: 'Hello! I purchased a tufted carpet two days ago. Could you please provide an update on the shipping status?' },
    { id: 3, sender: 'Business Inquiry', subject: 'Bulk Order Discount', preview: 'Looking for 50+ units...', time: 'Mar 28', status: 'read', content: 'We are looking to source 50 units for a hotel project. Do you offer wholesale pricing for bulk orders?' }
  ]);

  const activeMsg = messages.find(m => m.id === activeMessageId);

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row g-4 h-100">
        
        {/* Header Section */}
        <div className="col-12 d-flex justify-content-between align-items-center mb-2">
          <h2 className="fw-bold m-0">Customer Messages</h2>
          <div className="badge bg-primary rounded-pill px-3 py-2">3 New Notifications</div>
        </div>

        {/* 1. Message List Pane */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
            <div className="p-3 border-bottom bg-white">
              <input type="text" className="form-control form-control-sm border-0 bg-light rounded-pill px-3" placeholder="Search messages..." />
            </div>
            <div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '70vh' }}>
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setActiveMessageId(msg.id)}
                  className={`list-group-item list-group-item-action border-0 p-3 ${activeMessageId === msg.id ? 'bg-primary bg-opacity-10 border-start border-primary border-4' : ''}`}
                >
                  <div className="d-flex justify-content-between mb-1">
                    <h6 className={`mb-0 ${msg.status === 'unread' ? 'fw-bold' : ''}`}>{msg.sender}</h6>
                    <small className="text-muted">{msg.time}</small>
                  </div>
                  <div className="text-truncate small text-secondary">{msg.subject}</div>
                  <div className="text-truncate x-small text-muted" style={{ fontSize: '0.8rem' }}>{msg.preview}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Conversation View Pane */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-column">
            
            {/* Chat Header */}
            <div className="p-4 border-bottom d-flex align-items-center justify-content-between bg-white rounded-top-4">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '45px', height: '45px' }}>
                  {activeMsg.sender.charAt(0)}
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">{activeMsg.sender}</h5>
                  <small className="text-success fw-semibold">● Online</small>
                </div>
              </div>
              <div className="dropdown">
                <button className="btn btn-light btn-sm rounded-circle" type="button">⋮</button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-white flex-grow-1 overflow-auto" style={{ height: '50vh' }}>
              <div className="mb-4">
                <div className="bg-light p-3 rounded-4 d-inline-block shadow-sm" style={{ maxWidth: '80%' }}>
                  <p className="mb-1 fw-bold text-primary small">{activeMsg.subject}</p>
                  <p className="mb-0">{activeMsg.content}</p>
                </div>
                <div className="text-muted x-small mt-1 ps-2">{activeMsg.time}</div>
              </div>

              {/* Sample Admin Reply (Right-aligned) */}
              <div className="text-end mb-4">
                <div className="bg-primary text-white p-3 rounded-4 d-inline-block shadow-sm" style={{ maxWidth: '80%' }}>
                  <p className="mb-0">Hello! Thank you for reaching out. Let me check the stock for you right away.</p>
                </div>
                <div className="text-muted x-small mt-1 pe-2">Just now</div>
              </div>
            </div>

            {/* Chat Input Footer */}
            <div className="p-3 border-top bg-light rounded-bottom-4">
              <div className="input-group">
                <button className="btn btn-outline-secondary border-0" type="button">📎</button>
                <input type="text" className="form-control border-0 bg-white rounded-pill px-4 mx-2" placeholder="Type your reply here..." />
                <button className="btn btn-primary rounded-pill px-4 shadow-sm" type="button">
                  Send
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Messages;