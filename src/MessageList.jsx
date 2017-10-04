import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messageComponents = this.props.messages.map(eachMsg => {
      return <Message key={eachMsg.key} username={eachMsg.username} content={eachMsg.content} />;
    });
    return (

      <main className='messages'>

        {messageComponents}

      </main>
    )
  };
}

export default MessageList;
