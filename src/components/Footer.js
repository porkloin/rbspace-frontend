import React from 'react'


const Footer = () => (
  <footer>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p
        style={{
          padding: '2em 0',
          borderTop: '1px solid #666',
          textAlign: 'center',
          marginBottom: '0',
          fontSize: '.75em',
          width: '100%',
        }}
      >
        <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br />All written work on this website is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
        <br /> <br />
        Built with <a href="http://gatsbyjs.org/">GatsbyJS</a>.
      </p>
    </div>
  </footer>
)

export default Footer
