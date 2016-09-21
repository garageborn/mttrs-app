import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import Category from './CategoryTile'
import styles from '../styles/Menu'

class Menu extends Component {
  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.header}>
          <Text>Top Stories</Text>
        </View>

        <View style={styles.selector}>
          <TouchableHighlight style={styles.selectorButton}>
            <Text>Categories</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.selectorButton}>
            <Text>Publishers</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.topStories}>
            <Image style={styles.topStoriesIcon} source={require('../assets/icons/icon-top-stories.png')} />
            <Text>Top Stories</Text>
            <Image style={styles.selectedMarker} source={require('../assets/icons/icon-selected.png')} />
          </View>

          <View style={styles.categories}>
            <Category styles={styles} name='Business' icon={require('../assets/icons/icon-business.png')} />
            <Category styles={styles} name='Sports' icon={require('../assets/icons/icon-sports.png')} />
            <Category styles={styles} name='Technology' icon={require('../assets/icons/icon-technology.png')} />
            <Category styles={styles} name='Entertainment' icon={require('../assets/icons/icon-entertainment.png')} />
            <Category styles={styles} name='Science' icon={require('../assets/icons/icon-science.png')} />
            <Category styles={styles} name={'Gaming'} icon={require('../assets/icons/icon-gaming.png')} />
            <Category styles={styles} name={'World News'} icon={require('../assets/icons/icon-world.png')} />
            <Category styles={styles} name={'Humour'} icon={require('../assets/icons/icon-humour.png')} />
          </View>
        </View>
      </View>
    )
  }
}

export default Menu
