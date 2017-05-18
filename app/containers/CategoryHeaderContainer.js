import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Header from '../components/Header'
import _isEmpty from 'lodash/isEmpty'

const messages = defineMessages({
  headerTitle: { id: 'header.topStories' }
})

const CategoryHeaderContainer = ({ category, intl, params }) => {
  let title = intl.formatMessage(messages.headerTitle)

  if (!_isEmpty(category)) { title = category.name }

  return <Header title={title} params={params} type='home' />
}

CategoryHeaderContainer.propTypes = {
  category: PropTypes.any,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired
}

export default injectIntl(CategoryHeaderContainer)
