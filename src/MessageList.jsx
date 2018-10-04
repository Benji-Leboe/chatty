import React, { Component } from 'react';

function MessageList(props) {
  let elems = [...props.messages, ...props.notifications];

  elems.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  let elemArr = elems.map(message => {
    let { id, timestamp, content, username } = message;
    return (
      <div key={ id.toString() } data-time={ timestamp } className={`${message.type}`}>

        {message.type === 'messages' && <span className="message-username">
          { username ? username : 'Anonymous' }
        </span>}

        <span className={`${message.type}-content`}>{ content }</span>
      </div>
    );
  });

  return (
    <div>{ elemArr }</div>  
  );
}

export default MessageList;