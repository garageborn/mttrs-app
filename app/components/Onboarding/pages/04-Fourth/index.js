import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
const image = require('./assets/image.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.fourth.title'
  },

  description: {
    id: 'onboarding.fourth.description'
  }
})

const Fourth = ({ intl }) => {
  let title = intl.formatMessage(messages.title)
  let description = intl.formatMessage(messages.description)

  return <Page image={image} title={title} description={description} />
}

Fourth.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Fourth)
