import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messageComponents = this.props.messages.map(eachMsg => {
      //eachMsg = JSON.parse(eachMsg);
      return <Message id={eachMsg.id} key={eachMsg.id} username={eachMsg.username} content={eachMsg.content} />;
    });
    return (

      <main className='messages'>

        {messageComponents}

      </main>
    )
  };
}

export default MessageList;
