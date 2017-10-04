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
  messageBox(newUser, message) {
      //let newKey = this.state.messages.length + 1;
      // Add a new message to the list of messages in the data store
      //const newMessage = {key: newKey, username: newUser, content: message};
      // Update the state of the app component.
      //newSocket.send('User ' +  newUser + ' said ' + message);
      let msg = {
        username: newUser,
        content: message
      };

      newSocket.addEventListener('message', (event) =>{
      const allMessages = this.state.messages.concat(JSON.parse(event.data));
      this.setState({messages: allMessages});
      document.getElementById('chatbarMessage').value = '';

      })
      newSocket.send(JSON.stringify(msg));


      // Calling setState will trigger a call to render() in App and all child components.

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
/*
  typeInput.on('input', (evt) => {
    const input = (evt.target);
    newSocket.send(input.val());
  })*/
  newSocket.onopen = function(){

  newSocket.send(JSON.stringify({content: 'You are now connected.'}));
  }




  }
}

      //document.getElementById('chatbarMessage').val(event);

export default App;