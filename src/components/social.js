import React from 'react'
import Link from './link'
import theme from '../../config/theme'
import { css } from '@emotion/core'
import config from '../../config/website'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faLinkedin, faGithub, faGitlab} from '@fortawesome/free-brands-svg-icons';
import {darken} from 'polished';

const abSocialLink = ({color}) => css`
  margin-left: 10px;
  
  svg:hover {
    color: ${darken(0.08, color)};  
  }
`

export const Twitter = ({
  color = `${theme.colors.body_color}`,
  url = `${config.twitter}`,
}) => (
  <Link to={url}
        css={abSocialLink({color})}
        aria-label="Visit my Twitter">
    <FontAwesomeIcon color={color}
                     icon={faTwitter}/>
  </Link>
)

export const LinkedIn = ({
  color = `${theme.colors.body_color}`,
  url = `${config.linkedin}`,
}) => (
  <Link to={url}
        css={abSocialLink({color})}
        aria-label="Visit my LinkedIn">
    <FontAwesomeIcon color={color}
                     icon={faLinkedin}/>
  </Link>
)

export const GitHub = ({
  color = `${theme.colors.body_color}`,
  url = `${config.github}`,
}) => (
  <Link to={url}
        css={abSocialLink({color})}
        aria-label="Visit my GitHub">
    <FontAwesomeIcon color={color}
                     icon={faGithub}/>
  </Link>
)

export const GitLab = ({
  color = `${theme.colors.body_color}`,
  url = `${config.gitlab}`,
}) => (
  <Link to={url}
        css={abSocialLink({color})}
        aria-label="Visit my GitLab">
    <FontAwesomeIcon color={color}
                     icon={faGitlab}/>
  </Link>
)
