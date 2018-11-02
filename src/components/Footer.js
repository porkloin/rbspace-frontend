import React from 'react'


const Footer = () => (
  <footer>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
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
          fontSize: '.75em'
        }}
      >
        Built with <a href="http://gatsbyjs.org/">Gatsby</a> in front and <a href="https://www.drupal.org/8">Drupal 8</a> in the back.
      </p>
    </div>
  </footer>
)

export default Footer
