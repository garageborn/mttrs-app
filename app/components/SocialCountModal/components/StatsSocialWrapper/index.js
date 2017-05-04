import React, { PropTypes } from 'react'
import { View } from 'react-native'
import StatsSocialItem from '../StatsSocialItem'
import styles from './styles'

const StatsSocialWrapper = ({ socialCounter }) => (
  <View style={styles.container}>
    <View style={styles.firstRow}>
      <StatsSocialItem type='facebook' value={socialCounter.facebook} />
      <StatsSocialItem type='twitter' value={socialCounter.twitter} />
      <StatsSocialItem type='linkedin' value={socialCounter.linkedin} />
    </View>
    <View style={styles.secondRow}>
      <StatsSocialItem type='pinterest' value={socialCounter.pinterest} />
      <StatsSocialItem type='googlePlus' value={socialCounter.google_plus} />
    </View>
  </View>
)

StatsSocialWrapper.propTypes = {
  socialCounter: PropTypes.shape({
    facebook: PropTypes.number.isRequired,
    google_plus: PropTypes.number.isRequired,
    linkedin: PropTypes.number.isRequired,
    pinterest: PropTypes.number.isRequired,
    twitter: PropTypes.number.isRequired
  }).isRequired
}

export default StatsSocialWrapper
