import React from 'react';
import Popup from './Popup.jsx';

function Chatbar ({ addMessage, updateCurrentUser, currentUser }) {

  let textInput = React.createRef();

  function submitMessage(content) {
    addMessage(content);
  }
  function updateUser(user) {
    updateCurrentUser(user);
  }
  function focusOnSubmit() {
    textInput.current.focus();
  }
  function handleEnter(event) {
    if (event.key === 'Enter') {
      let content = event.target.value;
      if(content.length > 0) {
        if (event.target.name === 'msgInput') {
          submitMessage(content);
          event.target.value = '';
        } else if (event.target.name = 'usernameInput') {
          if (content !== currentUser){
            updateUser(content);
          }
          focusOnSubmit();
        }
      }
    }
  }
  return (
    <footer className="chatbar">
      <input name="usernameInput" className="chatbar-username" onKeyDown={ handleEnter } defaultValue={ currentUser } />
      <input name="msgInput" className="chatbar-message" onKeyDown={ handleEnter } ref={ textInput } placeholder="Type a message and hit ENTER" />
      <Popup />
    </footer>
  );
}

export default Chatbar;