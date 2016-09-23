import React from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import styles from '../styles/MenuPublishers'

const MenuPublisherItem = ({ name, logo }) => {
  return (
    <TouchableHighlight style={styles.touch}>
      <View style={styles.publisher}>
        <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default MenuPublisherItem
