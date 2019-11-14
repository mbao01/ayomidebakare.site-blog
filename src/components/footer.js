import React from 'react'
import { css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'
import { useTheme } from 'emotion-theming'
import { rhythm } from '../lib/typography'
import { Twitter, GitHub, GitLab } from './social'
import SubscribeForm from './forms/subscribe'
import Container from './container'

export default function Footer({ noSubscribeForm }) {
  const theme = useTheme()
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  return (
    <footer>
      <Container>
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
          `}
        >
          {!noSubscribeForm && (
            <div
              css={css`
                background-color: ${theme.colors.primary.base};
                padding: ${rhythm(0.5)};
                border-radius: 6px;
                h4,
                h3 {
                  color: ${theme.colors.white.base};
                }
              `}
            >
              <SubscribeForm />
            </div>
          )}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin: ${rhythm(1)} 0;
              padding: ${rhythm(0.5)};
            `}
          >
            <div
              css={css`
                font-size: 90%;
                opacity: 0.7;
                margin-bottom: ${rhythm(0.4)};
              `}
            >
              {`${
                data.site.siteMetadata.author.name
              } \u00A9 ${new Date().getFullYear()}`}
            </div>

            <div>
              <Twitter color={theme.colors.primary.base} />
              <GitLab color={theme.colors.primary.base} />
              <GitHub color={theme.colors.primary.base} />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
