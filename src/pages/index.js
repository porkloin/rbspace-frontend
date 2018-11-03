import React from 'react'

import Layout from '../components/layout'
import Biographical from '../components/biographical'
import BlogRoll from '../components/BlogRoll'

const IndexPage = ( {data} ) => (
  <Layout pageTitle='Home'>
    <Biographical
      links={
        [
          {
            'href': 'http://www.github.com/porkloin',
            'text': 'github',
          },
          {
            'href': 'http://www.twitter.com/_porkloin_',
            'text': 'twitter',
          },
        ]
      }
    />
    <h2>About Me</h2>
    <p>I am a web developer and internet person currently working with <a href="http://www.hook42.com">Hook 42.</a> I primarily occupy meatspace in Fairbanks, Alaska.</p>
    <p style={{ marginBottom: '1.45rem'}}>Things I like: bicycling, playing music, computers, and video games.</p>
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
