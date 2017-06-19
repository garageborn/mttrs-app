import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import { injectIntl } from 'react-intl'
import BottomTabItem from '../BottomTabItem'

const PublishersTabBar = ({ focused, intl }) => {
  const getIcon = () => {
    if (focused) {
      return <Image source={require('./assets/active.png')} />
    } else {
      return <Image source={require('./assets/inactive.png')} />
    }
  }

  return (
    <BottomTabItem
      active={focused}
      icon={getIcon()}
      message={intl.formatMessage({ id: 'tabBar.publishers' })}
    />
  )
}

PublishersTabBar.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  focused: PropTypes.bool.isRequired
}
export default injectIntl(PublishersTabBar)
