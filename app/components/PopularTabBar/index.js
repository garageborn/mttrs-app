import React, { Component } from 'react'
import { Text, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  label: { id: 'tabBar.popular' }
})

class PopularTabBar extends Component {
  render () {
    const { intl } = this.props

    return (
      <Text>{intl.formatMessage(messages.label)}</Text>
    )
  }
}

export const PopularTabBarIcon = ({focused}) => {
  if (focused) {
    return <Image source={require('./assets/active.png')} />
  } else {
    return <Image source={require('./assets/inactive.png')} />
  }
}
export default injectIntl(PopularTabBar)
