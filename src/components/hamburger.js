import React from 'react'
import './hamburger.css'

const Hamburger = ({ isActive, theme }) => (
  <div className={ isActive ? "hamburger--squeeze is-active " + theme : "hamburger--squeeze " + theme}>
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </div>
)

export default Hamburger
