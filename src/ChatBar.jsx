import React, {Component} from 'react';

class ChatBar extends Component {

    constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);

    }
    onKeyUp() {
    this.props.messageBox();

    }

  render() {
    return (
    <footer className="chatbar">
    <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.onKeyUp} />
    </footer>
    );
  }
}
export default ChatBar;

