import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout pageTitle="Not Found">
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist. <Link to="/">Go home?</Link></p>
  </Layout>
)

export default NotFoundPage
