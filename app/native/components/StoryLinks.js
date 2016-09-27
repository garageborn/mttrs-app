import React from 'react'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/StoryLinks'

const isFirstRow = (id, x, y) => {
  return id === '0' ? x : y
}

const StoryLinks = ({ rowData, rowID, openLink }) => {
  return (
    <View
      shadowOffset={{width: 1, height: 2}}
      shadowColor={'rgba(0, 0, 0, .1)'}
      shadowOpacity={1.0}
      style={isFirstRow(rowID, styles.firstRow, styles.row)}>
      <View style={isFirstRow(rowID, styles.firstRowContainer, styles.rowContainer)}>
        <View style={styles.publisher}>
          <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
          <View style={styles.publisherInfo}>
            <Text style={styles.title}>{rowData.publisher.name}</Text>
            <Text style={styles.time}>Yesterday 07:01</Text>
          </View>
        </View>
        <View style={styles.story}>
          <TouchableHighlight style={styles.rowTouch} onPress={openLink}>
            <Text numberOfLines={2} style={styles.storyTitle}>{rowData.title}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

export default StoryLinks
