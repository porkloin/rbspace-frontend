import React from 'react'

import Layout from '../components/layout'
import BlogRoll from '../components/BlogRoll'

const Blog = ( {data} ) => (
  <Layout pageTitle='Blog' pageDescription='The personal blog of Ryan Bateman. Pls read, ventertaining.'>
    <h1>Blog</h1>
    <BlogRoll blogs={data.allNodeArticle.edges} />
  </Layout>
)

export default Blog

export const query = graphql`
  query
    {
      allNodeArticle(sort: { fields: created, order: DESC}) {
        edges {
          node {
            fields {
              slug
            }
            title
            created
            body {
              summary
              processed
            }
            relationships {
              field_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 150, maxHeight: 150) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
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
