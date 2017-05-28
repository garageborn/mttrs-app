import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles'

const messages = defineMessages({
  label: { id: 'tabBar.summaries' }
})

class SummariesTabBar extends Component {
  render () {
    const { intl } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{intl.formatMessage(messages.label)}</Text>
      </View>
    )
  }
}

export const SummariesTabBarIcon = ({focused}) => {
  if (focused) {
    return <Image source={require('./assets/active.png')} />
  } else {
    return <Image source={require('./assets/inactive.png')} />
  }
}
export default injectIntl(SummariesTabBar)
