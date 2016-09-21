import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import Category from './CategoryTile'
import ButtonGroup from './ButtonGroup'
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
          <TouchableHighlight onPress={() => console.log(123)}>
            <View style={styles.topStories} shadowOffset={{width: 1, height: 1}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0} elevation={5}>
              <Image style={styles.topStoriesIcon} source={require('../assets/icons/icon-top-stories.png')} />
              <Text style={styles.topStoriesTitle}>Top Stories</Text>
              <Image style={styles.selectedMarker} source={require('../assets/icons/icon-selected.png')} />
            </View>
          </TouchableHighlight>

          <View style={styles.categories}>
            <Category color='#1D74FE' name='Business' icon={require('../assets/icons/icon-business.png')} />
            <Category color='#F75453' name='Sports' icon={require('../assets/icons/icon-sports.png')} />
            <Category color='#77C62B' name='Technology' icon={require('../assets/icons/icon-technology.png')} />
            <Category color='#E0349D' name='Entertainment' icon={require('../assets/icons/icon-entertainment.png')} />
            <Category color='#757575' name='Science' icon={require('../assets/icons/icon-science.png')} />
            <Category color='#1DC786' name='Gaming' icon={require('../assets/icons/icon-gaming.png')} />
            <Category color='#3537C8' name='World News' icon={require('../assets/icons/icon-world.png')} />
            <Category color='#EF7846' name='Humour' icon={require('../assets/icons/icon-humour.png')} />
          </View>
        </View>
      </View>
    )
  }
}

export default Menu
