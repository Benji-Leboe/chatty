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

  updateState = (entry, data, cb) => {
    const newData = this.state[entry].concat(data);
    this.setState({[entry]: newData}, () => {
      cb && cb();
    });
  }

  addMessage = (message) => {
    const newMsg = {
      id: uuid(),
      type: 'messages',
      timestamp: new Date(),
      username: this.state.currentUser,
      content: message
    }
    this.sock.send(JSON.stringify(newMsg));
  }

  addNotification = (notification) => {
    const newNote = {
      id: uuid(),
      type: 'notifications',
      timestamp: new Date(),
      content: notification
    }
    this.sock.send(JSON.stringify(newNote));
  }

  updateCurrentUser = (user) => {
    let oldUsername = this.state.currentUser;
    
    this.setState({'currentUser': user}, () => {
      this.addNotification(`${oldUsername} changed their name to ${this.state.currentUser}`);
    }); 
  }

  componentDidMount() {
    this.sock.onerror = (err) => {throw err};
    // cs.onclose

    this.sock.onopen = () => {
      this.sock.send('YEET');
    };

    this.sock.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log('Event message:', data.type, data);
      this.updateState(data.type, data);
    }
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
