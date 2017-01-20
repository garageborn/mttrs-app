import React, { PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'
import SocialCountFormatter from '../../common/utils/SocialCountFormatter'

const SocialCount = ({totalSocial}) => {
  return (
    <View style={styles.shares}>
      <Image style={styles.shareIcon} source={require('../../assets/icons/icon-hot.png')} />
      <Text style={styles.shareCount}>{SocialCountFormatter(totalSocial)}</Text>
    </View>
  )
}

SocialCount.propTypes = {
  totalSocial: PropTypes.string.isRequired
}

export default SocialCount
