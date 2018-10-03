import React, { Component } from 'react';

function Chatbar (props) {
  function submitMessage(content) {
    props.addMessage(content);
  }
  function updateUser(user) {
    props.updateCurrentUser(user);
  }

  function handleEnter(event) {
    if (event.key === 'Enter') {
      let content = event.target.value;
      if(content.length > 0) {
        if (event.target.name === 'msgInput') {
          submitMessage(content);
          event.target.value = '';
        } else if (event.target.name = 'usernameInput') {
          updateUser(content);
        }
      }
    }
  }
  return (
    <footer className="chatbar">
      <input name="usernameInput" className="chatbar-username" onKeyDown={ handleEnter } defaultValue={ props.currentUser } />
      <input name="msgInput" className="chatbar-message" onKeyDown={ handleEnter }  placeholder="Type a message and hit ENTER" />
    </footer>
  );
}

export default Chatbar;