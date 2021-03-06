import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import './biographical.css'

const Biographical = ( { links } ) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "me.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div className="biographical">
        <Img className="biographical--image circle" fluid={data.placeholderImage.childImageSharp.fluid} />
        <ul className="biographical--links">
          { links.map((link, i) => (
            i < links.length - 1 ? <React.Fragment key={i}><li><a href={link.href} rel="me">{link.text}</a></li><li> | </li></React.Fragment>
            : <React.Fragment key={i}><li><a href={link.href}>{link.text}</a></li></React.Fragment>
          )
          )}
        </ul>
      </div>
    )}
  />
)
export default Biographical
