import React, { PropTypes } from 'react'
import { View } from 'react-native'
import StatsSocialItem from '../StatsSocialItem'
import styles from './styles'

const StatsSocialWrapper = ({ socialCounter }) => (
  <View style={styles.container}>
    <StatsSocialItem type='facebook' value={socialCounter.facebook} />
    <StatsSocialItem type='twitter' value={socialCounter.twitter} />
    <StatsSocialItem type='linkedin' value={socialCounter.linkedin} />
    <StatsSocialItem type='pinterest' value={socialCounter.pinterest} />
  </View>
)

StatsSocialWrapper.propTypes = {
  socialCounter: PropTypes.shape({
    facebook: PropTypes.number.isRequired,
    linkedin: PropTypes.number.isRequired,
    pinterest: PropTypes.number.isRequired,
    twitter: PropTypes.number.isRequired
  }).isRequired
}

export default StatsSocialWrapper
