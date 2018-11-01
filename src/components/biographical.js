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
          <li>github</li>
          <li>twitter</li>
        </ul>
      </div>
    )}
  />
)
export default Biographical
