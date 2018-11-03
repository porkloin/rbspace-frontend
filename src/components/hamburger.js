import React from 'react'
import './hamburger.css'

const Hamburger = ({ isActive, theme }) => (
  <div className={ isActive ? "hamburger--squeeze is-active " + theme : "hamburger--squeeze " + theme}>
    <span className="hamburger-box">
      <span className="hamburger-inner"></span>
    </span>
  </div>
)

export default Hamburger
