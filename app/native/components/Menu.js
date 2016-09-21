import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import ButtonGroup from './ButtonGroup'
import MenuCategory from './MenuCategory'
import styles from '../styles/Menu'

class Menu extends Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['Categories', 'Publishers']
    const { selectedIndex } = this.state
    return (
      <View style={styles.menu}>
        <View style={styles.header}>
          <Image source={require('../assets/icons/icon-top-stories.png')} />
          <Text style={styles.headerTitle}>Top Stories</Text>
          <Image source={require('../assets/arrow.png')} />
        </View>

        <View style={styles.selector}>
          <ButtonGroup
            selectedBackgroundColor='#42729B'
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons} />
        </View>

        <View style={styles.menuContainer}>
          <MenuCategory />
        </View>
      </View>
    )
  }
}

export default Menu
