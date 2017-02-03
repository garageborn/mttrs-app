import React, { PropTypes } from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

const PageImage = ({ source, imageStyle }) => (
  <View style={styles.container}>
    <Image source={source} style={[styles.image, { ...imageStyle }]} />
  </View>
)

PageImage.propTypes = {
  source: PropTypes.any.isRequired,
  imageStyle: PropTypes.object
}

export default PageImage
