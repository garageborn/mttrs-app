import React, { PropTypes } from 'react'
import { injectIntl, defineMessages } from 'react-intl'
import Header from '../components/Header/index'

const messages = defineMessages({
  headerTitle: {
    id: 'header.title',
    defaultMessage: 'Top Stories'
  }
})

const HomeHeaderContainer = ({ toggleMenu, category, intl }) => {
  let title = intl.formatMessage(messages.headerTitle)
  if (category) { title = category.name }

  return (
    <Header
      toggleMenu={toggleMenu}
      title={title}
    />
  )
}

HomeHeaderContainer.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  category: PropTypes.object,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(HomeHeaderContainer)
