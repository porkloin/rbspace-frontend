import React from 'react'

import './ThemeSwitcher.css'

const ThemeSwitcher = ({themeToggle, theme}) => (
  <div
    className="theme-switcher"
    style= {{
      position: 'fixed',
      background: theme === 'light' ? 'black' : 'white',
      borderRadius: '50%',
    }}
    onClick={themeToggle}
  >
    <div
      style={{
        border: theme === 'light' ? '3px solid white' : '3px solid black',
      }}
      className="theme-switcher--drop"
    >
    </div>
  </div>
)

export default ThemeSwitcher
