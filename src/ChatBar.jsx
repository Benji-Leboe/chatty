import React, { Component } from 'react';

function Chatbar (props) {
  function submitMessage(content) {
    props.addMessage(content);
  }
  function updateUser(user) {
    props.updateCurrentUser(user);
  }

  function isValidUrl (string) {
    try {
      new URL(string);
    } catch (err) {
      return false;  
    }
    return true;
  }

  let re = /\/(.*?)\((.*?)\)/;


  const chatMap = {
    'img': function(url) {
      return (<img src={ url } />);
    },
    'link': function(url, content) {
      return (<a href={ url }> { content || url } </a>);
    },
    'bold': function(content) {
      return (<strong>{ content }</strong>);
    },
    'ital': function(content) {
      return (<em>{ content }</em>);
    }
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