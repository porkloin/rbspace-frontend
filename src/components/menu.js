import React from 'react'
import { Link } from 'gatsby'
import logo from '../images/logo.svg'
import './menu.css'


const Menu = ({ menuLinks }) => (
  <nav className="menu--main">
    {
      menuLinks.map(link =>
        <li key={link.link} style={{ 'listStyleType': 'none'}}>
          <Link to={link.link}>{link.name}</Link>
        </li>)
    }
  </nav>

)
export default Menu
