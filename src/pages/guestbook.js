import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import GuestBookLog from '../components/GuestBookLog'
import Layout from '../components/layout'

const guestbook = ( {messages, sendMessage, setMessages} ) => (
  <Layout pageTitle='Realtime Guestbook' pageDescription="Ryan Bateman's realtime, emoji-only guestbook.">
    <h1>Guestbook</h1>
    <GuestBookLog messages={messages} sendMessage={sendMessage} setMessages={setMessages} />
  </Layout>
)

guestbook.propTypes = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  setMessages: PropTypes.func.isRequired,
}

const mapStateToProps = ({ messages }) => {
  return { messages }
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (message) => dispatch({
      type: `SEND_MESSAGE`,
      payload: message,
    }),
    setMessages: (messages) => dispatch({
      type: `SET_MESSAGES`,
      payload: messages,
    })
  }
}

const Connectedguestbook = connect(
  mapStateToProps,
  mapDispatchToProps
)(guestbook)

export default Connectedguestbook
