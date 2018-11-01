import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Biographical from '../components/biographical'
import BlogRoll from '../components/BlogRoll'
import Image from '../components/image'

const IndexPage = ( {data} ) => (
  <Layout>
    <Biographical />
    <h2>About Me</h2>
    <p>I am a web developer and internet person currently working with <a href="www.hook42.com">Hook 42.</a> I primarily occupy meatspace in Fairbanks, Alaska.</p>
    <p>Things I like: bicycling, computers, video games, and ice fishing.</p>
    <h2>Blog</h2>
    <BlogRoll blogs={data.allNodeArticle.edges} readMore={true} />
  </Layout>
)

export default IndexPage

export const query = graphql`
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
