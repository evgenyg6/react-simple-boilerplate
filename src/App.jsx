import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.messageBox = this.messageBox.bind(this);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      {
        key: 1,
        username: "Bob",
        content: "Has anyone seen my marbles?"
      },
      {
        key: 2,
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
      ]
};
  }
messageBox(newUser, message) {
    console.log("If you don't know, now you know.", newUser, message);
    let newKey = this.state.messages.length + 1;
    // Add a new message to the list of messages in the data store
    const newMessage = {key: newKey, username: newUser, content: message};
    const allMessages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: allMessages})
    document.getElementById('chatbarMessage').value = '';

}
  render() {
    return (
      <div id='container'>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar messageBox= {this.messageBox} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;