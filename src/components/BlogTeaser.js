import React from 'react'
import { Link } from 'gatsby'

const BlogTeaser = ({ postTitle, postImage, postSummary, postLink }) => (
  <article>
    <div className="blog--teaser-image">
      <img src="http://via.placeholder.com/150" />
    </div>
    <div className="blog--teaser-text">
      <h2>{postTitle}</h2>
      <p dangerouslySetInnerHTML={{__html: postSummary}}></p>
    </div>
  </article>
)

export default BlogTeaser
