import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import { injectIntl } from 'react-intl'
import BottomTabItem from '../BottomTabItem'

class PopularTabBar extends Component {
  render () {
    const { focused, intl } = this.props
    return (
      <BottomTabItem
        active={focused}
        icon={this.icon}
        message={intl.formatMessage({ id: 'tabBar.popular' })}
      />
    )
  }

  get icon () {
    if (this.props.focused) {
      return <Image source={require('./assets/active.png')} />
    } else {
      return <Image source={require('./assets/inactive.png')} />
    }
  }
}

PopularTabBar.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  focused: PropTypes.bool.isRequired
}
export default injectIntl(PopularTabBar)
