import React from 'react'
import Layout from "../components/Layout"
import { graphql, useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import blogStyles from '../styles/blog.module.scss'
import SEO from '../components/Seo'


const BlogPage = () => {
    const data = useStaticQuery(graphql`
    query {
      allContentfulEveryOtherDayBlog(
        sort: {
          fields: publishedDate,
          order: DESC
        }
      ) {
        edges {
          node {
            title
            slug
            publishedDate(formatString: "MMMM D, YYYY" )
          }
        }
      }
    }
    `)
    console.log(data)
    return (
        <Layout>
            <SEO title='Blog' />
            <h1>Blog</h1>
            <ol className={blogStyles.posts}>
                {data.allContentfulEveryOtherDayBlog.edges.map((edge) => {
                    return (
                        <li className={blogStyles.post} >

                            <Link to={`${edge.node.slug}`}>
                                <h2>{edge.node.title}</h2>
                                <p>{edge.node.publishedDate}</p>
                            </Link>
                        </li>
                    )
                })}
            </ol>
        </Layout>
    )
}

export default BlogPage