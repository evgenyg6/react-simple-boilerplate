import React, {Component} from 'react';

class Message extends Component {
    constructor(props) {
    super(props);
    }
  render() {

    return (
    <div className="message">
    <span className="chatbar-username">defaultValue={this.props.username} </span>
    <span className="chatbar-content">defaultValue={this.props.content} </span>
    </div>
    );
  }
}
export default Message;
