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
  }

  addMessage = (message) => {
    const newMsg = {
      id: uuid(),
      timestamp: new Date(),
      username: this.state.currentUser,
      messageContent: message
    }
    const messages = this.state.messages.concat(newMsg);
    this.setState({ messages: messages });
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
    setTimeout(() => {
      console.log('It\'s a simulation, bitches');

      const newMsg = {id: 8, timestamp:"2018-10-03T02:10:28.669Z", username: 'Michelle', messageContent: 'What up, fuckers'};
      const messages = this.state.messages.concat(newMsg);
      console.log(this.state.messages);
      this.setState({messages: messages});
    }, 3000);
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
