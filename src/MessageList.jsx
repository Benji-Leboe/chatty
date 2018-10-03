import React, { Component } from 'react';

function MessageList(props) {
  let messageElems = props.messages.map(message => {
    let { id, timestamp, messageContent, username } = message;
    return (
      <div key={id.toString()} data-time={timestamp} className="message">
        <span className="message-username">{ username ? username : 'Anonymous' }</span>
        <span className="message-content">{ messageContent }</span>
      </div>
    );
  });

  let notificationElems = props.notifications.map(notification => {
    let { id, timestamp, notificationContent } = notification;
    return (
      <div key={id.toString()} data-time={timestamp} className="notification">
        <span className="notification-content">{ notificationContent }</span>
      </div>
    );
  });

  let chatList = messageElems.concat(notificationElems);
  console.log(chatList);
  chatList.sort((a,b) => {
    return new Date(a.props["data-time"]) - new Date(b.props["data-time"]);
  });

  return (
    <div>{chatList}</div>  
  );
}

export default MessageList;