import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchMessages, appendMessage } from '../actions';
import Message from '../components/message';
import MessageForm from '../containers/message_form';
import App from '../components/app';

class MessageList extends Component {
  componentDidMount() {
    this.fetchMessages();
    if (App.cable) { // Check if App.cable exists
      this.subscribeActionCable(this.props);
    }
    setInterval(() => {
      this.fetchMessages(this.props.selectedChannel);
    }, 1000);
  }

  componentDidUpdate(nextProps) { // For after switching channels
    if (this.props.selectedChannel != nextProps.selectedChannel) {
      this.subscribeActionCable(nextProps);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  fetchMessages = () => {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  subscribeActionCable = (props) => {
    App[`channel_${props.selectedChannel}`] = App.cable.subscriptions.create(
      { channel: 'ChannelsChannel', name: props.selectedChannel },
      {
        received: (message) => {
          if (message.channel === props.selectedChannel) {
            props.appendMessage(message);
          }
        }
      }
    );
  }

  render () {
    return (
      <div className="channel-container">
        <div className="channel-title">
          <span>Channel #{this.props.selectedChannel}</span>
        </div>
        <div className="channel-content" ref={list => this.list = list}>
          {
            this.props.messages.map((message) => {
              return <Message key={message.id} {...message} />;
            })
          }
        </div>
        <MessageForm selectedChannel={this.props.selectedChannel} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages, appendMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
