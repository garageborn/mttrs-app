import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
import styles from './styles'
const image = require('./assets/04-publishers.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.publishers.title'
  },

  description: {
    id: 'onboarding.publishers.description'
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
