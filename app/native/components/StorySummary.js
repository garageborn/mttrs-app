import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import styles from '../styles/StorySummary'

const StorySummary = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.triangleContainer}>
        <View style={styles.outerTriangle}/>
        <View style={styles.innerTriangle}/>
      </View>
      <View style={styles.box}>
        <View style={styles.headlineContainer}>
          <Text>👔</Text>
          <Text style={styles.headline}>{props.headline.toUpperCase()}</Text>
        </View>
        <Text style={styles.summary}>{props.summary}</Text>
      </View>
    </View>
  )
}

export default StorySummary
