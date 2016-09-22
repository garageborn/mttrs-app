import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, TextInput } from 'react-native'
import styles from '../styles/Menu'

class MenuPublishers extends Component {
  render() {
    return (
      <View>
        <View style={styles.search}>
          <TextInput style={styles.searchInput} />
        </View>
      </View>
    )
  }
}

export default MenuPublishers
