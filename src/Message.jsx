import React, {Component} from 'react';

class Message extends Component {

  render() {
    let viewMessage;
    const {type, username, content, oldUsername, userCount, isConnected, isDisconnected} = this.props.data;
    if(type === 'incomingNotification'){
      viewMessage = <span className='message-system'>{`${oldUsername} changed their name to ${username}`}</span>;
    } else if(type === 'incomingMessage') {
      viewMessage = (<div className="message"><span className='message-username'>{username}</span><span className='message-content'>{content}</span></div>)
      } else if(isConnected){
      viewMessage = <span className='message-content'> {`${isConnected}`}</span>
      } else if(isDisconnected){
      viewMessage = <span className='message-content'> {`${isDisconnected}`}</span>
      }
    return (
    <div>
      {viewMessage}
    </div>
    );
  }
}
export default Message;