import React, { PropTypes } from 'react'
import { View, Image } from 'react-native'
import styles from './styles.js'

const AdImage = ({ source }) => (
  <View style={styles.container}>
    <Image resizeMode='contain' style={styles.image} source={{uri: source}} />
  </View>
)

AdImage.propTypes = {
  source: PropTypes.string.isRequired
}

export default AdImage
