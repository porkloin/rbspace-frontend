import React from 'react'
import BlogTeaser from './BlogTeaser'
import { Link, StaticQuery } from 'gatsby'

import './BlogRoll.css'


const BlogRoll = ( {blogs, readMore} ) => (
  <StaticQuery
    query={graphql`
      query {
        fileName: file(relativePath: { eq: "code.png" }) {
          childImageSharp {
            fluid(maxWidth: 150, maxHeight: 150) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
  render={data => (
    <div className="blog-roll">
      {blogs.map((blog) => (
        <BlogTeaser
          key={blog.node.fields.slug}
          data={data}
          postTitle={blog.node.title}
          postSummary={blog.node.body.summary.length > 0 ? blog.node.body.summary : blog.node.body.processed.substring(0,200) + '...' }
          postImage={blog.node.relationships.field_image ? blog.node.relationships.field_image.localFile.childImageSharp.fluid : data.fileName.childImageSharp.fluid}
          postSlug={blog.node.fields.slug}
        />
      ))}
      { readMore ? <Link className="blog--read-more" to="/blog">Read more</Link> : null }
    </div>
  )}
  />
)

export default BlogRoll
