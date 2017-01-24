import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const HeaderStripColor = ({ type }) => (
  <View style={styles.container}>
    <View style={styles.strip} />
  </View>
)

HeaderStripColor.propTypes = {
  type: PropTypes.string.isRequired
}

export default HeaderStripColor
