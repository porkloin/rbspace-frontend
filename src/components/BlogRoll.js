import React from 'react'
import BlogTeaser from './BlogTeaser'
import { Link } from 'gatsby'


const BlogRoll = ( {blogs} ) => (
  <div className="blog-roll">
    {blogs.map((blog) => (
      <BlogTeaser
        postTitle={blog.node.title}
        postSummary={blog.node.body.summary.length > 0 ? blog.node.body.summary : blog.node.body.processed}
      />
    ))}
  </div>
)

export default BlogRoll


