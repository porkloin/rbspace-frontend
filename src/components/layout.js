import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './Footer'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title,
            tagline,
            menuLinks {
              name,
              link
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Ryan Bateman is a full stack web developer occupying meatspace in Fairbanks, Alaska.' },
            { name: 'keywords', content: 'web development, drupal, react, reactjs, javascript' },
          ]}
        >
          <html lang="en" />
        </Helmet>
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteTagline={data.site.siteMetadata.tagline}
        siteLogo={'/'}
        menuLinks={data.site.siteMetadata.menuLinks}
      />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
