import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
import styles from './styles'
const image = require('../assets/05-categories.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.categories.title'
  },

  description: {
    id: 'onboarding.categories.description'
  }
})

const Categories = ({ intl }) => {
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

Categories.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Categories)
