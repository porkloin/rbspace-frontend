import React, {Component} from 'react'
import io from 'socket.io-client';
import uuidv1 from 'uuid/v1';
import { animateScroll } from "react-scroll";
import { Picker } from 'emoji-mart';
import { geolocated } from 'react-geolocated';
import openGeocoder from 'node-open-geocoder';

import GuestBookMessage from './GuestBookMessage'
import 'emoji-mart/css/emoji-mart.css'
import './GuestBookLog.css';


class GuestBookLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "guest-book-log"
    });
  }

  componentDidMount() {
    this.socket = io(process.env.GATSBY_SOCKET_IO_URL);
    this.socket.on('init', (data) => {
      this.setState({ messages: data });
      this.scrollToBottom();
    });
    this.socket.on('message', (data) => {
      let newMessages = [...this.state.messages];
      newMessages.push(data);
      this.setState({ messages: newMessages })
      this.scrollToBottom();
    });
  }

	componentDidUpdate() {
		if (this.props.isGeolocationEnabled && this.props.coords && !this.state.location) {
			let generalLocation;
			openGeocoder()
				.reverse(
					this.props.coords.longitude,
					this.props.coords.latitude)
				.end((err, res) => { this.setState({ location: res.address.county }) });
		}
	}

  handleEmojiClick(emoji) {
    this.socket.emit('message', JSON.stringify(
			{
				message: emoji.id,
				location: this.state.location ? this.state.location : 'Somewhere in space...'
			}
		));
  }
  render() {
    return (
      <div className="guest-book">
        <div
          id="guest-book-log"
          className="guest-book-log"
        >
          {this.state.messages.length > 0 ? this.state.messages.map((message) => <GuestBookMessage key={uuidv1()} message={message} />) : 'Loading...' }
        </div>
        <Picker onSelect={this.handleEmojiClick} />
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(GuestBookLog);
