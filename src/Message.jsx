import React, { Component } from 'react';

function Messages (props) {
  return (
    <main className="messages">
      
      <div className="message system">
        {props.children}
      </div>
    </main>
  );
}

export default Messages;