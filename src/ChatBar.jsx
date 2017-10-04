import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);

    }
    //Selects chatbar username and messagr from ChatBar itself
    onType(press) {
    if(press.key === 'Enter'){
    this.props.messageBox(document.getElementById('chatbarUsername').value, document.getElementById('chatbarMessage').value);
    }
  };

  render() {
    return (
    <footer className="chatbar">
    <input id="chatbarUsername" className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
    <input id="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.onType} />
    </footer>
    );
  }
}
export default ChatBar;

