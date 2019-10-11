import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogRoll from '../components/BlogRoll'

const Blog = ( {data} ) => (
  <Layout pageTitle='Blog' pageDescription='The personal blog of Ryan Bateman. Pls read, ventertaining.'>
    <h1>Blog</h1>
    <BlogRoll blogs={data.allMarkdownRemark.edges} />
  </Layout>
)

export default Blog

export const query = graphql`
  query
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 160)
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  /*export const query = graphql`
  query
    {
      allNodeArticle(limit: 5, sort: { fields: created, order: DESC}) {
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
  */
