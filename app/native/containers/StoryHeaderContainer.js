import React, { Component } from 'react'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/HeaderPublisher'

class StoryHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <View style={styles.header} shadowOffset={{width: 1, height: 1}} shadowColor={'rgba(0, 0, 0, .5)'} shadowOpacity={1.0} elevation={5}>
        <View style={styles.publisher}>
          <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
          <View style={styles.publisherInfo}>
            <Text style={styles.title}>New York Times</Text>
            <Text style={styles.time}>Ontem às 7:01</Text>
          </View>
        </View>
        <View style={styles.actions}>
          {/* onPress Mockup! */}
          <TouchableHighlight onPress={this.toggleMenu}>
            <Image style={styles.iconShare} source={require('../assets/icons/icon-share.png')} />
          </TouchableHighlight>
          {/* onPress Mockup! */}
          <TouchableHighlight onPress={this.toggleMenu}>
            <Image style={styles.iconClose} source={require('../assets/icons/icon-close.png')} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  toggleMenu() {
    Actions.menu()
  }
}

export default StoryHeaderContainer
