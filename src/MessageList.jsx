import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const messageComponents = this.props.messages.map(eachMsg => {
      <Message key={eachMsg.key} content ={eachMsg.content} username={eachMsg.username}/>;
    });
    return (
      <main className='messages'>
        {messageComponents}
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
      </main>
    )
  };
}

export default MessageList;
