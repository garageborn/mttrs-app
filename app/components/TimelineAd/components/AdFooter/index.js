import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Button from '../../../Button'
import styles from './styles.js'

const AdFooter = ({ buttonText, description }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{description}</Text>
    <Button onPress={() => {}} skin={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Button>
  </View>
)

AdFooter.propTypes = {
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default AdFooter
