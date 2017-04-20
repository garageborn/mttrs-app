import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
import styles from './styles'
const image = require('./assets/image.png')
const icon = require('./assets/brand.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.first.title'
  },

  description: {
    id: 'onboarding.first.description'
  }
})

const First = ({ intl }) => {
  let title = intl.formatMessage(messages.title)
  let description = intl.formatMessage(messages.description)

  return (
    <Page
      image={image}
      imageStyles={styles.image}
      icon={icon}
      title={title}
      description={description}
    />
  )
}

First.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(First)
