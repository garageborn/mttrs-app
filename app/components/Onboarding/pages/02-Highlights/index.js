import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
import styles from './styles'
const image = require('../assets/02-highlights.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.highlights.title'
  },

  description: {
    id: 'onboarding.highlights.description'
  }
})

const Highlights = ({ intl }) => {
  let title = intl.formatMessage(messages.title)
  let description = intl.formatMessage(messages.description)

  return (
    <Page
      image={image}
      imageStyle={styles.image}
      title={title}
      description={description}
    />
  )
}

Highlights.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Highlights)
