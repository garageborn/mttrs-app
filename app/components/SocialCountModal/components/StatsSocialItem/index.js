import React, { PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import SocialCountFormatter from '../../../../common/utils/SocialCountFormatter'
import styles from './styles.js'

const images = {
  facebook: require('./assets/facebook.png'),
  googlePlus: require('./assets/googlePlus.png'),
  linkedin: require('./assets/linkedin.png'),
  pinterest: require('./assets/pinterest.png'),
  twitter: require('./assets/twitter.png')
}

const StatsSocialItem = ({ type, value }) => {
  let getValue = () => {
    if (!value) return '--'
    return SocialCountFormatter(value)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images[type]} />
      <Text style={styles.text}>{getValue()}</Text>
    </View>
  )
}

StatsSocialItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default StatsSocialItem
