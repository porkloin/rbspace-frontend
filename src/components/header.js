import React from 'react'
import { Link } from 'gatsby'
import Menu from './Menu'
import logo from '../images/logo.svg'
import './header.css'

const Header = ({ siteTitle, siteTagline, menuLinks }) => (
  <header
    style={{
      background: 'white',
      marginBottom: '1.45rem',
    }}
  >
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
          style={{
            fontWeight: '300',
            textTransform: 'capitalize',
            paddingLeft: '5px',
          }}
        >
          {siteTagline}
        </span>
      </Link>
      <Menu menuLinks={menuLinks} />
      <div className="menu--main--toggle">
        toggle
      </div>
      </div>
  </header>
)

export default Header
