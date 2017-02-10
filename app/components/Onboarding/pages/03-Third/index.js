import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
import styles from './styles'
const image = require('./assets/03-editorial.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.editorial.title'
  },

  description: {
    id: 'onboarding.editorial.description'
  }
})

const Editorial = ({ intl }) => {
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

Editorial.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Editorial)