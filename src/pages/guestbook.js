import React from 'react'

import GuestBookLog from '../components/GuestBookLog'
import Layout from '../components/layout'

const guestbook = () => (
  <Layout pageTitle='Realtime Guestbook' pageDescription="Ryan Bateman's realtime, emoji-only guestbook.">
    <h1>Guestbook</h1>
    <GuestBookLog />
  </Layout>
)

export default guestbook
