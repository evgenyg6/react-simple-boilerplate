import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
let newSocket = new WebSocket('ws:localhost:3001');

class App extends Component {
  constructor(props) {
    super(props);
    this.messageBox = this.messageBox.bind(this);

    this.state = {
      currentUser: 'Bob',
      messages: [],
      userCount: 0,
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
      <nav className='navbar'>
      <a href='/' className='navbar-brand'>Chatty</a>
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

  })
  }
}
export default App;



