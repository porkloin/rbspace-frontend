import React, {Component} from 'react'
import EmojiPicker from 'emoji-picker-react';

import GuestBookMessage from './GuestBookMessage'


class GuestBookLog extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000")
      .then(response => response.json())
      .then(data => this.props.setMessages(data))
      .catch(err => console.log(err));
  }

  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.sendMessage({ message: this.state.inputValue });
  }
  handleEmojiClick(code, emoji) {
    this.props.sendMessage({'message': ':' + emoji.name + ':'});
  }
  render() {
    return (
      <div
        className="guest-book-log"
      >
        {this.props.messages.length > 0 ? this.props.messages.map((message) => <GuestBookMessage key={message} message={message} />) : 'No messages found. Sad!' }
        <EmojiPicker onEmojiClick={this.handleEmojiClick} />
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="message" value={this.state.inputValue} onChange={this.handleInputChange} />
        </form>
      </div>
    )
  }
}

export default GuestBookLog
