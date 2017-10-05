import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
let newSocket = new WebSocket("ws:localhost:3001");

class App extends Component {
  constructor(props) {
    super(props);
    this.messageBox = this.messageBox.bind(this);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }
  // Grabs messages from chatbarMessage and chatbarUsername and displays them
  messageBox(type, newUser, message) {
    this.state.currentUser.name = newUser;
      // Update the state of the app component.
      // Add a new message to the list of messages in the data store
      let msg = {
        type: type,
        username: newUser,
        content: message
      };
      newSocket.send(JSON.stringify(msg));
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
  componentDidMount(){
    // Concatinates, converts object to JSON and sends to server
    newSocket.addEventListener('message', (event) =>{
    const data = JSON.parse(event.data)
    //renders incoming message, or alerts of notification(name change)
    switch(data.type) {
      case "incomingMessage":
        const allMessages = this.state.messages.concat(data);
        this.setState({messages: allMessages});
        document.getElementById('chatbarMessage').value = '';
        break;
      case "incomingNotification":
        console.log('The user ' + this.state.currentUser + ' has changed their name to ' + this.state.currentUser.name);
        //newSocket.send(JSON.stringify({content: 'The user has changed their name to: ' + this.state.currentUser}));
        break;
      default:
        throw new Error("Unknown event type " + data.type);
      }
    })

  /*  newSocket.onopen = function(){
    newSocket.send(JSON.stringify({content: 'You are now connected.'}));
    }*/
  }
}
export default App;



