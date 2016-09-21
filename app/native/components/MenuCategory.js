import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import Category from './CategoryTile'
import styles from '../styles/Menu'

class MenuCategory extends Component {
  render() {
    return (
      <View>
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
    )
  }
}

export default MenuCategory
