import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'

import Header from './header'
import Footer from './Footer'
import ThemeSwitcher from './ThemeSwitcher'
import './layout.css'

const lightCss = `
  html, body { background: #fff; }
`

const darkCss = `
  html, body { background: #111; }
`


const Layout = ({ children, themeToggle, theme, pageTitle, pageDescription }) => (
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
      <div
        style={{
            background: theme === 'light' ? '#fff' : '#111',
            color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        <Helmet
          title={pageTitle + ' | ' + data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: pageDescription ?  pageDescription : 'Ryan Bateman is a full stack web developer occupying meatspace in Fairbanks, Alaska.' },
            { name: 'keywords', content: 'web development, drupal, react, reactjs, javascript' },
            { name: 'application-name', content: 'Ryan Bateman' },
            { name: 'theme-color', content: theme === 'light' ? '#fff' : '#111' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
          ]}
        >
          <html lang="en" />
          <style>{ theme === 'light' ? lightCss : darkCss }</style>
        </Helmet>
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteTagline={data.site.siteMetadata.tagline}
        siteLogo={'/'}
        menuLinks={data.site.siteMetadata.menuLinks}
        theme={theme}
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
      <ThemeSwitcher themeToggle={themeToggle} theme={theme} />
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
  themeToggle: PropTypes.func.isRequired,
}

const mapStateToProps = ({ theme }) => {
  return { theme }
}

const mapDispatchToProps = dispatch => {
  return { themeToggle: () => dispatch({ type: `THEME_TOGGLE` }) }
}

const ConnectedLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default ConnectedLayout
