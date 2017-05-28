import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles'

const messages = defineMessages({
  label: { id: 'tabBar.favorites' }
})

class FavoritesTabBar extends Component {
  render () {
    const { intl } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{intl.formatMessage(messages.label)}</Text>
      </View>
    )
  }
}

export const FavoritesTabBarIcon = ({focused}) => {
  if (focused) {
    return <Image source={require('./assets/active.png')} />
  } else {
    return <Image source={require('./assets/inactive.png')} />
  }
}
export default injectIntl(FavoritesTabBar)
