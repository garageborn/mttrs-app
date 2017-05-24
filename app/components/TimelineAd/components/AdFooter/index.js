import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Button from '../../../Button'
import styles from './styles.js'

const AdFooter = ({ buttonText, description }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{description}</Text>
    <View style={styles.buttonContainer}>
      <Button onPress={() => {}} background='timelineAd' content={buttonText} size='regular' />
    </View>
  </View>
)

AdFooter.propTypes = {
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default AdFooter
