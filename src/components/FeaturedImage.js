import React from 'react'
import { StaticQuery } from "gatsby"
import Img from "gatsby-image"

import './FeaturedImage.css'

const FeaturedImage = ({imgFluid}) => (
  <StaticQuery
    query={graphql`
      query DefaultImageQuery {
        fileName: file(relativePath: { eq: "code.png" }) {
          childImageSharp {
            fluid(maxWidth: 300, maxHeight: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
  render={data => (
    <div className="featured-image circle">
      <Img fluid={imgFluid ? imgFluid : data.fileName.childImageSharp.fluid} />
    </div>
  )}
  />
)

export default FeaturedImage
