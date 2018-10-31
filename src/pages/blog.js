import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import BlogRoll from '../components/BlogRoll'

const Blog = ( {data} ) => (
  <Layout>
    <h1>Blog</h1>
    <BlogRoll blogs={data.allNodeArticle.edges} />
  </Layout>
)

export default Blog

export const query = graphql`
  query 
    {
      allNodeArticle {
        edges {
          node {
            title
            created
            body {
              summary
              processed
            }
            id
            drupal_id
            relationships {
              field_image {
                id
              }
              field_tags {
                id
              }
              type {
                id
              }
            }
          }
        }
      }
    }
`
