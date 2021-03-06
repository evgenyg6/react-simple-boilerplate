import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    }
    //Selects chatbar username and message from ChatBar itself
    onType(press) {
      if(press.key === 'Enter'){
      this.props.messageBox('incomingMessage', document.getElementById('chatbarUsername').value, document.getElementById('chatbarMessage').value);
      }
    }
    //Selects user only, has a blank paremeter to match messageBox input parameters
    onUserChange(press) {
      if(press.key === 'Enter'){
      this.props.messageBox('incomingNotification', document.getElementById('chatbarUsername').value, '', this.props.currentUser);
      }
    }
  render() {
    return (
      <footer className='chatbar'>
      <input id='chatbarUsername' className='chatbar-username'defaultValue={this.props.currentUser} onKeyPress={this.onUserChange} placeholder='Your Name (Optional)' />
      <input id='chatbarMessage' className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={this.onType} />
      </footer>
    );
  }
}
export default ChatBar;