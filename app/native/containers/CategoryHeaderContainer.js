import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from '../styles/Header'
import { Actions } from 'react-native-router-flux'

class CategoryHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.toggleMenu}>
            <Text>Category</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  toggleMenu() {
    Actions.menu()
  }
}

export default CategoryHeaderContainer
