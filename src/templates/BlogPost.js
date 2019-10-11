import { graphql } from "gatsby"
import moment from 'moment'
import React from "react"
import PostBody from '../components/PostBody'
import Img from "gatsby-image"
import Layout from "../components/layout"
import '../components/FeaturedImage.css'
import './BlogPost.css'

const BlogPost = ({ data }) => (
  <Layout pageTitle={data.markdownRemark.frontmatter.title} pageDescription={data.markdownRemark.excerpt}>
    <article>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <i><p className="publication-date">{data.markdownRemark.frontmatter.date}</p></i>
      <div className="featured-image circle">
        <Img fluid={data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid} />
      </div>
      <PostBody body={data.markdownRemark.html} />
    </article>
  </Layout>
)
export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
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
`


  /*export const query = graphql`
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
`*/
