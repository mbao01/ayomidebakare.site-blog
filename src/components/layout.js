import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/tag'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import mdxComponents from './mdx'
import { transparentize } from 'polished'
import { rhythm } from '../lib/typography'
import { ThemeProvider } from 'emotion-theming'
import ThemeContext from '../context/theme'
import Footer from './footer'
import Header from './header'

export const styles = theme => css`
  ${theme.media.maxSM} {
    p,
    em,
    article,
    strong {
      font-size: ${rhythm(2 / 3)};
    }
    h1 {
      font-size: ${rhythm(4 / 3)};
    }
    h2 {
      font-size: ${rhythm(1)};
    }
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html,
  body {
    font-style: normal;
    transition: ${theme.transition.ease};
  }
  html {
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    overflow-y: auto !important;
    -ms-overflow-style: scrollbar;
  }
  body {
    color: ${theme.textColor};
    background-color: ${theme.bgColor};
  }
  ::selection {
    color: ${theme.colors.white.base};
    background-color: ${theme.linkColor};
  }
  h1,
  h2 {
    margin: ${rhythm(2)} 0 ${rhythm(1)} 0;
  }
  h3,
  h4 {
    margin: ${rhythm(1 / 2)} 0;
  }
  h5,
  h6 {
    margin: ${rhythm(1 / 4)} 0;
  }
  hr {
    background: none;
    border: none;
    border-top: 1px solid ${theme.bodyColor};
    margin: ${rhythm(1)} 0;
  }
  input {
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    height: 32px;
    margin-top: ${rhythm(1 / 2)};
    padding: 5px 10px;
    ::placeholder {
      opacity: 0.4;
    }
  }
  button {
    background-color: ${theme.linkColor};
    border: 1px solid ${theme.linkHoverColor};
    border-radius: 4px;
    color: ${theme.colors.white.base};
    cursor: pointer;
    height: 32px;
    padding: 5px 10px;
    transition: ${theme.transition.ease};

    :hover {
      background: ${theme.linkHoverColor};
    }
  }
  pre {
    background-color: ${theme.colors.indigo.dark} !important;
    border-radius: 4px;
    padding: 10px;
    overflow-x: auto;
    white-space: nowrap;
    /* Track */
    ::-webkit-scrollbar {
      width: 4px;
      height: 5px;
      border-radius: 0 0 5px 5px;
    }
    ::-webkit-scrollbar-track {
      background: ${theme.colors.indigo.light};
      border-radius: 0 0 4px 4px;
      border: 1px solid ${theme.colors.indigo.dark};
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.grey.base};
      border-radius: 5px;
    }
  }
  form {
    margin: 0;
  }
  a {
    color: ${theme.linkColor};
    text-decoration: none;
    cursor: pointer;
    transition: ${theme.transition.ease};

    &:hover,
    &:focus {
      color: ${theme.linkHoverColor};
    }
  }
  a:not([href]):not([tabindex]) {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
    }
    &:focus {
      outline: 0;
    }
  }
  blockquote {
    border-left: 5px solid ${theme.linkColor};
    padding-left: 1rem !important;
    margin: 0 0 ${rhythm(1)} 0 !important;
    font-style: italic;
    color: ${theme.linkHoverColor};
    p {
      line-height: 1.3 !important;
    }
  }
  p {
    margin: 0 0 ${rhythm(1)} 0;
    text-align: left;
    line-height: 1.7;
  }
  ul {
    margin: 0 0 ${rhythm(1)} 0;
  }
  li,
  ol {
    margin: 0 0 ${rhythm(1 / 2)} 0;
  }
  ul,
  ol,
  li {
    list-style: inherit;
    list-style-position: inside;
    margin-left: 0;
  }
  code {
    color: ${theme.colors.red.light};
    padding: 2px 4px;
    background: ${transparentize(0.9, theme.colors.grey.light)};
    border-radius: 4px;
  }
  [tabindex='-1']:focus {
    outline: none !important;
  }
  table {
    border-collapse: collapse;
    background-color: ${theme.bgColor};
  }
  caption {
    padding-top: ${rhythm(1)};
    padding-bottom: ${rhythm(1)};
    color: ${theme.colors.indigo.light};
    text-align: center;
    caption-side: bottom;
  }
  label {
    display: inline-block;
    margin-bottom: ${rhythm(1 / 2)};
  }
  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }
  input,
  button,
  select,
  textarea {
    line-height: inherit;
  }
  input[type='date'],
  input[type='time'],
  input[type='datetime-local'],
  input[type='month'] {
    -webkit-appearance: listbox;
  }
  textarea {
    resize: vertical;
  }
  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }
  legend {
    display: block;
    width: 100%;
    padding: 0;
    margin-bottom: ${rhythm(1 / 2)};
    font-size: ${rhythm(1)};
    line-height: inherit;
  }
  input[type='search'] {
    -webkit-appearance: none;
  }
  output {
    display: inline-block;
  }
  svg {
    transition: ${theme.transition.ease};
  }
  svg:not(:root) {
    overflow: hidden;
    vertical-align: middle;
  }
  [hidden] {
    display: none !important;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`

class Layout extends React.Component {
  state = { loaded: false }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ loaded: true })
  }

  render() {
    const {
      fields = {},
      children,
      noFooter,
      noHeader,
      noSubscribeForm,
      dark,
      theme,
      toggleDark,
    } = this.props

    return (
      this.state.loaded && (
        <ThemeProvider theme={theme}>
          <StaticQuery
            query={graphql`
              query {
                site {
                  siteMetadata {
                    title
                    description
                    author {
                      name
                    }
                    keywords
                  }
                }
              }
            `}
            render={data => (
              <>
                <Global styles={styles} />

                <Wrapper>
                  <Helmet
                    title={fields.title || data.site.siteMetadata.title}
                    meta={[
                      {
                        name: 'description',
                        content:
                          fields.description ||
                          data.site.siteMetadata.description,
                      },
                      {
                        name: 'keywords',
                        content:
                          fields.keywords || data.site.siteMetadata.keywords,
                      },
                    ]}
                  >
                    <html lang="en" />
                    <noscript>
                      This site runs best with JavaScript enabled.
                    </noscript>
                  </Helmet>

                  {!noHeader && <Header dark={dark} toggleDark={toggleDark} />}

                  <MDXProvider components={mdxComponents}>
                    {children}
                  </MDXProvider>

                  {!noFooter && <Footer noSubscribeForm={noSubscribeForm} />}
                </Wrapper>
              </>
            )}
          />
        </ThemeProvider>
      )
    )
  }
}

export default props => (
  <ThemeContext.Consumer>
    {({ dark, theme, toggleDark }) => (
      <Layout {...props} theme={theme} dark={dark} toggleDark={toggleDark} />
    )}
  </ThemeContext.Consumer>
)
