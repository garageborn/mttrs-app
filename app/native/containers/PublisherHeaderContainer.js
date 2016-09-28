import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from '../styles/Header'

class PublisherHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.toggleMenu}>
            <Text>Publisher</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  toggleMenu() {
    Actions.menu()
  }
}

export default PublisherHeaderContainer
