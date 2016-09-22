import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, TextInput } from 'react-native'
import styles from '../styles/Menu'

class MenuPublishers extends Component {
  render() {
    return (
      <View>
        <View style={styles.search} shadowOffset={{width: 1, height: 2}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0}>
          <Image style={styles.searchIcon} source={require('../assets/icons/icon-search.png')} />
          <TextInput style={styles.searchInput} placeholder='Search for publishers' />
        </View>
      </View>
    )
  }
}

export default MenuPublishers
