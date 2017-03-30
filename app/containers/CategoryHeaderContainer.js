import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Header from '../components/Header'
import _isEmpty from 'lodash/isEmpty'

const messages = defineMessages({
  headerTitle: { id: 'header.topStories' }
})

const CategoryHeaderContainer = ({ toggleMenu, category, intl, params, menuIsOpen }) => {
  let title = intl.formatMessage(messages.headerTitle)

  if (!_isEmpty(category)) { title = category.name }

  return (
    <Header
      toggleMenu={toggleMenu}
      title={title}
      params={params}
      menuIsOpen={menuIsOpen}
      type='home'
    />
  )
}

CategoryHeaderContainer.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  category: PropTypes.any,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired,
  menuIsOpen: PropTypes.bool.isRequired
}

export default injectIntl(CategoryHeaderContainer)
