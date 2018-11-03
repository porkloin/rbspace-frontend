import { graphql } from "gatsby"
import moment from 'moment'
import React from "react"
import FeaturedImage from '../components/FeaturedImage'

import Layout from "../components/layout"

const BlogPost = ({ data }) => (
  <Layout pageTitle={data.nodeArticle.title}>
    <article>
      <h1>{data.nodeArticle.title}</h1>
      <i><p className="publication-date">{moment.unix(data.nodeArticle.created).format('DD MMMM, YYYY - h:mm A')}</p></i>
      <FeaturedImage imgFluid={data.nodeArticle.relationships.field_image ? data.nodeArticle.relationships.field_image.localFile.childImageSharp.fluid : null} />
      <span dangerouslySetInnerHTML={{__html: data.nodeArticle.body.processed}}></span>
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
