import React, { Component } from 'react';

function MessageList(props) {
  let messageElems = props.messages.map(message => {
    let { id, type, content, username } = message;
    return type === 'incomingMessage' ? 
      (
        <div key={id.toString()} className="message">
          <span className="message-username">{ username ? username : 'Anonymous' }</span>
          <span className="message-content">{ content }</span>
        </div> 
      ) : ( 
        <div key={id.toString()} className="notification">
          <span className="notification-content">{ content }</span>
        </div>
    );
  });

  return (
    <div>{messageElems}</div>  
  );
}

export default MessageList;