import React from 'react';
import moment from 'moment';
import { Emoji } from 'emoji-mart'

const GuestBookMessage = ( { message } ) => (
  <p
    className="guest-book-message"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }}
  >
    {message.message.length > 0 ? <Emoji emoji={message.message} size={24} /> : null}
    <span style={{ textAlign: 'right', fontSize: '8px' }}>{moment(message.timestamp).format('YYYY-MM-D h:mm a')} – {message.location}</span>
  </p>
)

export default GuestBookMessage
