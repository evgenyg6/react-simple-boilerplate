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

/*  handleChange(event) {
    this.setState({currentUser: event.target.value});
  }*/



  // Grabs messages from chatbarMessage and chatbarUsername and displays them
  messageBox(newUser, message) {
      // Update the state of the app component.
      // Add a new message to the list of messages in the data store
      let msg = {
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
      const allMessages = this.state.messages.concat(JSON.parse(event.data));
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: allMessages});
      document.getElementById('chatbarMessage').value = '';
      })

    newSocket.onopen = function(){
    newSocket.send(JSON.stringify({content: 'You are now connected.'}));
    }

  }
}
export default App;