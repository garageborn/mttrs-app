import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
import styles from './styles'
const image = require('./assets/image.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.second.title'
  },

  description: {
    id: 'onboarding.second.description'
  }
})

const Second = ({ intl }) => {
  let title = intl.formatMessage(messages.title)
  let description = intl.formatMessage(messages.description)

  return (
    <Page
      image={image}
      imageStyles={styles.image}
      title={title}
      description={description}
    />
  )
}

Second.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Second)
