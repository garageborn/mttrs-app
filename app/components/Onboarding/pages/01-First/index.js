import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
import styles from './styles'
const image = require('./assets/01-welcome.png')
const icon = require('./assets/mttrs-brand.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.welcome.title'
  },

  description: {
    id: 'onboarding.welcome.description'
  }
})

const Welcome = ({ intl }) => {
  let title = intl.formatMessage(messages.title)
  let description = intl.formatMessage(messages.description)

  return (
    <Page
      image={image}
      imageStyle={styles.image}
      icon={icon}
      iconStyle={styles.icon}
      title={title}
      description={description}
    />
  )
}

Welcome.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Welcome)
