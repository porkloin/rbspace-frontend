import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"

import './BlogTeaser.css'

const BlogTeaser = ({ postTitle, postImage, postSummary, postSlug }) => (
  <article className="blog--teaser">
    <div className="blog--teaser-image">
      <Link to={postSlug}>
        <Img fluid={postImage} />
      </Link>
    </div>
    <div className="blog--teaser-text">
      <Link to={postSlug}>
        <h2>{postTitle}</h2>
      </Link>
      <p dangerouslySetInnerHTML={{__html: postSummary}}></p>
    </div>
  </article>
)

export default BlogTeaser
