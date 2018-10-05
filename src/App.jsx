import React, { Component } from 'react';
import Navbar from './Nav.jsx';
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
      userColor: "",
      messages: messages,
      notifications: notifications,
      connections: 0
    }
    this.sock = new WebSocket('ws://localhost:3001');
  }

  numUsers = () => {
    console.log("Nothin' yet");
  }

  updateState = (entry, data) => {
    const newData = this.state[entry].concat(data);
    this.setState({[entry]: newData}, () => {
    });
  }

  generateRandomHexColor = () => {
    let decimal = Math.floor(Math.random()*16777215);

    let hex = (decimal > (200 * 200 * 200) || decimal < (30 * 30 * 30)) ? decimal.toString(16) : this.generateRandomHexColor();
    
    this.setState({userColor: `#${hex}`});

    return hex;
  }

  addMessage = (message) => {
    const newMsg = {
      status: 'outgoing',
      id: uuid(),
      type: 'messages',
      timestamp: new Date(),
      user: {username: this.state.currentUser, userColor: this.state.userColor},
      content: message
    }
    this.sock.send(JSON.stringify(newMsg));
  }

  addNotification = (notification) => {
    const newNote = {
      status: 'outgoing',
      id: uuid(),
      type: 'notifications',
      timestamp: new Date(),
      content: notification
    }
    this.sock.send(JSON.stringify(newNote));
  }

  // addImage = (link) => {
  //   const newImg = {
  //     status: 'outgoing',
  //     id: uuid(),
  //     type: 'images',
  //     timestamp: new Date(),
  //     content: image
  //   }
  //   this.sock.send(JSON.stringify(newImg));
  // }

  updateCurrentUser = (user) => {
    const oldUsername = this.state.currentUser;
    
    this.setState({'currentUser': user}, () => {
      this.addNotification(`${oldUsername} changed their name to ${this.state.currentUser}`);
    }); 
  }

  componentDidMount() {
    this.generateRandomHexColor();
    console.log(this.state.userColor);
    this.sock.onerror = (err) => {throw err};
    // cs.onclose

    this.sock.onopen = () => {
      
      this.sock.send('YEET');
    };

    this.sock.onmessage = (event) => {
      let dataString = event.data;
      let data = JSON.parse(dataString);
      
      data.type === 'connections' ? this.setState({'connections': data.content}) : this.updateState(data.type, data); 
    }
  }

  render() {
    return (
      <div className="app-container">
        <Navbar userCount={this.state.connections} />
        <Messages>
          <MessageList images={this.state.images} notifications={this.state.notifications} messages={this.state.messages}/>
        </Messages>
        <Chatbar addImage={this.addImage} addMessage={this.addMessage} updateCurrentUser={this.updateCurrentUser} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
