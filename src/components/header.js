import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import Menu from './menu'
import Hamburger from './hamburger'
import logo from '../images/logo.svg'
import './header.css'


const Header = ({ siteTitle, siteTagline, menuLinks, menuToggle, menuIsClosed }) => (
  <header>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Link to="/" style={{height: '50px'}}>
        <img
          style={{
            height: '50px',
            width: 'auto',
            marginBottom: '0',
          }}
          src={logo}
          alt="Ryan Bateman logo"
        />
      </Link>
      <Link
        to="/"
        style={{
          color: 'black',
          textDecoration: 'none',
          textTransform: 'uppercase',
          fontSize: '1em',
          padding: '0 5px',
        }}
      >
        {siteTitle}
        <span
          className="site-slogan"
          style={{
            fontWeight: '300',
            color: '#555',
            textTransform: 'capitalize',
            paddingLeft: '10px',
          }}
        >
          {siteTagline}
        </span>
      </Link>
      <div className="menu--desktop">
        <Menu menuLinks={menuLinks} />
      </div>
      <div
        className="menu--main--toggle"
        onClick={menuToggle}
      >
        <Hamburger isActive={!menuIsClosed}  />
      </div>
    </div>
    <div
      className="menu--mobile--container"
      style={{
        display: menuIsClosed ? 'none' : 'flex',
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        alignItems: 'center'
      }}
    >
      <div className="menu--mobile">
        <Menu menuIsClosed={menuIsClosed} menuLinks={menuLinks}  />
      </div>
    </div>
  </header>
)

Header.propTypes = {
  menuIsClosed: PropTypes.bool.isRequired,
  menuToggle: PropTypes.func.isRequired,
}

const mapStateToProps = ({ menuIsClosed }) => {
  return { menuIsClosed }
}

const mapDispatchToProps = dispatch => {
  return { menuToggle: () => dispatch({ type: `MENU_TOGGLE` }) }
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default ConnectedHeader;
