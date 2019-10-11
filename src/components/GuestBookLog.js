import React, {Component} from 'react'
import io from 'socket.io-client';
import uuidv1 from 'uuid/v1';
import { animateScroll } from "react-scroll";
import { Picker } from 'emoji-mart';
import { geolocated } from 'react-geolocated';

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
    this.socket = io(process.env.GATSBY_SOCKET_IO_URL, { secure: true });
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
      let baseurl = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=';
      let nominatimurl = baseurl +  this.props.coords.latitude +'&lon=' + this.props.coords.longitude;
      let locationString;
      fetch(nominatimurl)
        .then((resp) => resp.json())
        .then(function(data) {
          if (data.address) {
            if (data.address.city && data.address.state) {
              locationString = data.address.city + ', ' + data.address.state;
            }
            else if (data.address.county && data.address.state) {
              locationString = data.address.county + ', ' + data.address.state;
            }
          }
          if (locationString !== null) {
            this.setState({ location: locationString });
          }
        }.bind(this))
        .catch(function(err) {
          console.log(err);
        });
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
