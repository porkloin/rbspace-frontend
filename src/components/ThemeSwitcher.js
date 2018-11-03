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
      data-place="top"
      data-tip="Invert color scheme"
      className="theme-switcher--drop"
    >
    </div>
    <div
      className="theme-switcher--tooltip"
      style={{
        background: theme === 'light' ? 'black' : 'white',
        color: theme === 'light' ? 'white' : 'black',
      }}
    >
      Invert color scheme
    </div>
    <div
      className="theme-switcher--tooltip-arrow"
      style={{
        borderLeft: theme === 'light' ? '10px solid black' : '10px solid white',
      }}
    >
    </div>
  </div>
)

export default ThemeSwitcher
