import { graphql } from "gatsby"
import moment from 'moment'
import React from "react"
import FeaturedImage from '../components/FeaturedImage'
import PostBody from '../components/PostBody'

import Layout from "../components/layout"

const BlogPost = ({ data }) => (
  <Layout pageTitle={data.nodeArticle.title} pageDescription={data.nodeArticle.body.summary.length > 0 ? data.nodeArticle.body.summary : data.nodeArticle.body.processed.substring(0,200) + '...' }>
    <article>
      <h1>{data.nodeArticle.title}</h1>
      <i><p className="publication-date">{moment.unix(data.nodeArticle.created).format('DD MMMM, YYYY - h:mm A')}</p></i>
      <FeaturedImage imgFluid={data.nodeArticle.relationships.field_image ? data.nodeArticle.relationships.field_image.localFile.childImageSharp.fluid : null} />
      <PostBody body={data.nodeArticle.body.processed} />
    </article>
  </Layout>
)
export default BlogPost

export const query = graphql`
  query($slug: String!) {
    nodeArticle (fields: { slug: { eq: $slug } }) {
      title
      created
      changed
      body {
        processed
        summary
      }
      relationships {
        field_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 300, maxHeight: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
