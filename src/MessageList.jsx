import React, { Component } from 'react';

function MessageList(props) {
  const elems = [...props.messages, ...props.notifications];

  elems.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  const elemArr = elems.map(message => {
    const { id, timestamp, content, user} = message;

    let colorStyles = (user) ? {color: user.userColor} : {color: "#000000"};

    return (
      <div key={ id.toString() } data-time={ timestamp } className={`${message.type}`}>

        {message.type === 'messages' && <span className="message-username" style={colorStyles}>
          { user.username || 'Anonymous' }
        </span>}

        <span className={`${message.type}-content`}>{ content } {message.type === 'images' && <img className="image" src={ imgLink } />}</span>

        
      </div>
    );
  });

  return (
    <div>{ elemArr }</div>  
  );
}

export default MessageList;