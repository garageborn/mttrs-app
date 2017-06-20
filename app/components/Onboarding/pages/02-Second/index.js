import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Page from '../../components/Page'
const image = require('./assets/image.png')

const messages = defineMessages({
  title: {
    id: 'onboarding.second.title'
  },

  description: {
    id: 'onboarding.second.description'
  }
})

const Third = ({ intl }) => {
  let title = intl.formatMessage(messages.title)
  let description = intl.formatMessage(messages.description)

  return <Page image={image} title={title} description={description} />
}

Third.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Third)
