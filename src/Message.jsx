import React, { Component } from 'react';

function Messages ({ children }) {
  return (
    <main className="messages-container">
      
      <div className="message-system">
        { children }
      </div>
    </main>
  );
}

export default Messages;