import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/Header'
import { Actions } from 'react-native-router-flux'

class StoryLinksSceneContainer extends Component {
  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
  }

  render() {
    return (
      <View>
        <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
      </View>
    )
  }

  openLink(link) {
  }
}

export default StoryLinksSceneContainer
