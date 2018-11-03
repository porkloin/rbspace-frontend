import React from 'react'
import { Link } from 'gatsby'
import './menu.css'


const Menu = ({ menuLinks, menuIsClosed, theme}) => (
  <nav className={menuIsClosed ? "menu--main closed " + theme : "menu--main open " + theme}>
    {
      menuLinks.map(link =>
        <li
          key={link.link}
          style={{
            'listStyleType': 'none',
          }}
        >
          <Link to={link.link}>{link.name}</Link>
        </li>)
    }
  </nav>

)
export default Menu
