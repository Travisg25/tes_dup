import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import SEO from '../components/SEO'

const contentful = require('contentful')

const client = contentful.createClient({
    space: '<space_id>',
    accessToken: '<content_delivery_api_key>'
})

const asset = client.getAsset('<asset_id>')
    .then((asset) => console.log(asset.fields.file.url))

const Blog = (props) => {
    const options = {
        renderNode: {
            "embedded-asset-block": (node) => {
                const alt = node.data.target.fields.title['en-US']
                const url = node.data.target.fields.file['en-US'].url
                return <img alt={alt} src={url} />
            }
        }
    }
    const post = props.data.contentfulEveryOtherDayBlog
    return (
        <Layout>
            <SEO title={props.data.contentfulEveryOtherDayBlog.title} />
            <h1>{props.data.contentfulEveryOtherDayBlog.title}</h1>
            <p>{props.data.contentfulEveryOtherDayBlog.publishedDate}</p>
            {documentToReactComponents(props.data.contentfulEveryOtherDayBlog.body.json, options)}
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
        contentfulEveryOtherDayBlog(slug: {eq: $slug}) {
        title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
      }
    }
  `
//Used to query mardown data from md files
//
// export const query = graphql`
//   query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `

export default Blog