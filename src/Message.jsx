import React, {Component} from 'react';

class Message extends Component {

  render() {
    let viewMessage;
    const {type, username, content, oldUsername} = this.props.data;
    console.log(this.props.data);
    if(type === "incomingNotification"){
      viewMessage = <span className="message-system">{`${oldUsername} changed their name to ${username}`}</span>;
    }else {
      viewMessage = (<div className="message"><span className="message-username">{username}</span><span className="message-content">{content}</span></div>)
      }

    return (
   <div>
    {viewMessage}
    </div>
    );
  }
}
export default Message;
