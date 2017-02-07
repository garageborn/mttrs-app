import React, { PropTypes } from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

const PageImage = ({ source, imageStyles }) => (
  <View style={styles.container}>
    <Image source={source} style={[styles.image, { ...imageStyles }]} />
  </View>
)

PageImage.propTypes = {
  source: PropTypes.any.isRequired,
  imageStyles: PropTypes.object
}

export default PageImage
