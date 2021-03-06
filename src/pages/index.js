import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Layout from '../components/layout'
import Link from '../components/link'
import Container from '../components/container'
import { rhythm } from '../lib/typography'
import PostCard from '../components/post/post-card'
import Announcement from '../components/announcement'

export default function Index({ data: { blog, notebook } }) {
  return (
    <Layout>
      <Container maxWidth="80%">
        <div
          css={theme => css`
            * {
              color: ${theme.colors.white.base};
            }
            width: 100%;
            padding-top: ${rhythm(1)};
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          `}
        >
          <Announcement />
        </div>
      </Container>
      <Container
        maxWidth={720}
        css={css`
          padding-bottom: 0;
          background-color: rgba(120, 120, 120, 0.01);
        `}
      >
        <h2
          css={css`
            font-size: ${rhythm(1)};
          `}
        >
          Blog
        </h2>

        {blog &&
          blog.edges &&
          blog.edges.map(({ node: post }) => (
            <PostCard key={post.id} post={post} type="small" />
          ))}

        <div>
          <small>
            <Link
              to="/blog"
              aria-label="Visit blog page"
              className="button-secondary"
            >
              View all posts
            </Link>
          </small>
        </div>
      </Container>
      <Container
        maxWidth={720}
        css={css`
          padding-bottom: 0;
          background-color: rgba(120, 120, 120, 0.01);
        `}
      >
        <h2
          css={css`
            font-size: ${rhythm(1)};
          `}
        >
          Notebooks
        </h2>

        {notebook &&
          notebook.edges &&
          notebook.edges.map(({ node: post }) => (
            <PostCard key={post.id} post={post} type="small" />
          ))}

        <div>
          <small>
            <Link
              to="/blog"
              aria-label="Visit blog page"
              className="button-secondary"
            >
              View all notebooks
            </Link>
          </small>
        </div>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    blog: allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { published: { ne: false } }
        fileAbsolutePath: { regex: "//content/blog//" }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            categories
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            keywords
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
    notebook: allJupyterNotebook(
      limit: 5
      sort: { fields: [metadata___date], order: DESC }
      filter: {
        fields: { published: { ne: false } }
        fileAbsolutePath: { regex: "//content/blog//" }
      }
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
            categories
            date(formatString: "MMMM DD, YYYY")
            description
            excerpt
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            keywords
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  }
`
