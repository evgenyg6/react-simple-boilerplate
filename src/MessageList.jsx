import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messageComponents = this.props.messages.map(eachMsg => {
      //eachMsg = JSON.parse(eachMsg);
      return <Message key={eachMsg.id} data={eachMsg}/>;
    });
    return (
      <main className='messages'>
        {messageComponents}
      </main>
    )
  }
}
export default MessageList;