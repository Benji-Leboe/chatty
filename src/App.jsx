import React, { Component } from 'react';
import Messages from './Message.jsx';
import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';
import { messages, notifications } from './messages.json';
import uuid from 'uuid/v1';



class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: "Anonymous",
      messages: messages,
      notifications: notifications
    }
    this.sock = new WebSocket('ws://localhost:3001');
  }

  addMessage = (message) => {
    const newMsg = {
      id: uuid(),
      timestamp: new Date(),
      username: this.state.currentUser,
      messageContent: message
    }
    this.sock.send(JSON.stringify(newMsg));
    // const messages = this.state.messages.concat(newMsg);
    // this.setState({ messages: messages });
  }

  addNotification = (notification) => {
    const newNote = {
      id: uuid(),
      timestamp: new Date(),
      notificationContent: notification
    }
    const notifications = this.state.notifications.concat(newNote);
    this.setState({ notifications: notifications });
  }

  updateCurrentUser = (user) => {
    let oldUsername = this.state.currentUser;

    this.setState({ currentUser: user }, () => {
      this.addNotification(`${oldUsername} changed their name to ${this.state.currentUser}`);
    }); 
  }

  componentDidMount() {
    this.sock.onerror = (err) => {throw err};
    // cs.onclose

    this.sock.onopen = () => {
      this.sock.send('YEET');
    };
  }

  render() {
    return (
      <div className="app-container">
        <Messages>
          <MessageList notifications={this.state.notifications} messages={this.state.messages}/>
        </Messages>
        <Chatbar addMessage={this.addMessage} updateCurrentUser={this.updateCurrentUser} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
