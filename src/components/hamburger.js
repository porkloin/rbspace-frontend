import React from 'react'
import './hamburger.css'

const Hamburger = ({ isActive }) => (
  <div className={ isActive ? "hamburger--squeeze is-active" : "hamburger--squeeze"}>
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </div>
)

export default Hamburger
