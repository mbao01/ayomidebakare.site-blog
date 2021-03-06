import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Message from '../components/confirm-message/message'
import {
  PleaseConfirmIllustration,
  ThankYouIllustration,
  UnsubscribeIllustration,
} from '../components/confirm-message/illustrations'

export default ({ data: { latestArticle } }) => {
  return (
    <Layout noSubscribeForm>
      <div>
        <Message
          illustration={PleaseConfirmIllustration}
          title="Great, one last thing..."
          body="We just sent you an email with the confirmation link. 
          **Please check your inbox!**"
        />
      </div>
      <div>
        {latestArticle.edges.map(({ node: post }) => (
          <Message
            key={post.id}
            illustration={ThankYouIllustration}
            title="Success! Thank you!"
            body="In case you haven’t seen already, here’s my latest article:"
            articleTitle={post.fields.title}
            articleSlug={post.fields.slug}
          />
        ))}
      </div>
      <div>
        <Message
          illustration={UnsubscribeIllustration}
          title="You have been unsubscribed."
          body="As per your request, you have been unsubscribed from all our mailings."
          note="Changed your mind? [Click here to resubscribe](#)"
        />
      </div>
    </Layout>
  )
}

export const latestArticle = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    latestArticle: allMdx(
      limit: 1
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { published: { ne: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
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
