import React from 'react'
import BlogTeaser from './BlogTeaser'
import { graphql } from 'gatsby'
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
          postTitle={blog.node.frontmatter.title}
          postSummary={blog.node.excerpt}
          postImage={ blog.node.frontmatter.featuredImage.childImageSharp.fluid}
          postSlug={blog.node.fields.slug}
        />
      ))}
      { readMore ? <Link className="blog--read-more" to="/blog">Read more</Link> : null }
    </div>
  )}
  />
)

export default BlogRoll
