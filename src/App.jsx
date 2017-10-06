import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
let newSocket = new WebSocket("ws:localhost:3001");

class App extends Component {
  constructor(props) {
    super(props);
    this.messageBox = this.messageBox.bind(this);

    this.state = {
      currentUser: "Bob",
      messages: [],
      userCount: ''
    };
  }
  // Grabs messages from chatbarMessage and chatbarUsername and displays them
  messageBox(type, newUser, message, oldUser) {
      // Add a new message to the list of messages in the data store
      let msg = {
        type: type,
        username: newUser,
        content: message,
        oldUsername: oldUser,
      };
      newSocket.send(JSON.stringify(msg));
  }

  render() {
    return (
      <div id='container'>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <div className='user-count'>Users online: {this.state.userCount}</div>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar messageBox= {this.messageBox} currentUser={this.state.currentUser}/>
      </div>
    );
  }
  componentDidMount(){
    newSocket.addEventListener('message', (event) =>{
    const data = JSON.parse(event.data);
    document.getElementById('chatbarMessage').value = '';
    //Sets the above STATE object to NEW state
    this.setState({
      messages: this.state.messages.concat(data),
      currentUser: data.username,
      userCount: data.userCount
    });
    //renders incoming message, or alerts of notifications(name change)
/*    switch(data.type) {
      case "incomingMessage":
        // Concatinates, converts object to JSON and sends to server
        const allMessages = this.state.messages.concat(data);
        this.setState({messages: allMessages});
        document.getElementById('chatbarMessage').value = '';
        break;
      case "incomingNotification":
        console.log('The user ' + data.oldUsername + ' has changed their name to ' + data.username);
        //newSocket.send(JSON.stringify({content: 'The user has changed their name to: ' + this.state.currentUser}));
        break;
      default:
        throw new Error("Unknown event type " + data.type);
      }*/
    })

   /* newSocket.onopen = function(){
    newSocket.send(JSON.stringify({content: 'You are now connected.'}));
    }*/
  }
}
export default App;



