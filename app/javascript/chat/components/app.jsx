import React from 'react';
import ChannelList from '../containers/channel_list';
import MessageList from '../containers/message_list';
import { useParams } from 'react-router-dom';

const App = () => {
  const { channel } = useParams();

  return (
    <div className="messaging-wrapper">
      <div className="logo-container">
        <img className="messaging-logo" src="https://raw.githubusercontent.com/lewagon/chat-redux/c94c9f868508de31d48346dee1bf1141a2f152db/assets/images/logo.svg" alt="logo" />
      </div>
      <ChannelList selectedChannel={ channel } />
      <MessageList selectedChannel={ channel } />
    </div>
  );
};

export default App;
