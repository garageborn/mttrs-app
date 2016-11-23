import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import styles from '../styles/StorySummary'

class StorySummary extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.triangleContainer}>
          <View style={styles.outerTriangle}/>
          <View style={styles.innerTriangle}/>
        </View>
        <View style={styles.box}>
          <View style={styles.headlineContainer}>
            <Text>👔</Text>
            <Text style={styles.headline}>{'hijodeputa cabron malparido'.toUpperCase()}</Text>
          </View>
          <Text style={styles.summary}>They grey fox jumps over the lazy dog</Text>
        </View>
      </View>
    )
  }
}
export default StorySummary
