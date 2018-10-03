import React, { Component } from 'react';
import Messages from './Message.jsx';
import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';
import { messages } from './messages.json';
import uuid from 'uuid/v1';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: "Anonymous",
      messages: messages
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(message) {
    const newMsg = {
      id: uuid(),
      type: 'incomingMessage',
      username: this.state.currentUser,
      content: message
    }
    const messages = this.state.messages.concat(newMsg);
    this.setState({ messages: messages });
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('It\'s a simulation, bitches');

      const newMsg = {id: 8, type: 'incomingMessage', username: 'Michelle', content: 'What up, fuckers'};
      const messages = this.state.messages.concat(newMsg);
      console.log(this.state.messages);
      this.setState({messages: messages});
    }, 3000);
  }

  render() {
    return (
      <div className="app-container">
        <Messages>
          <MessageList messages={this.state.messages}/>
        </Messages>
        <Chatbar addMessage={this.addMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
