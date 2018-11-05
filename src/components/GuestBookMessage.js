import React from 'react';
import Emoji from 'react-emoji-render';

const GuestBookMessage = ( { message } ) => (
  <p
    className="guest-book-message"
  >
    <Emoji text={message.message ? message.message : ':japanese_ogre:'} />
  </p>
)

export default GuestBookMessage
