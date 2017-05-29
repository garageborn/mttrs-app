import { StyleSheet } from 'react-native'
import { dangerColor, feedbackMessage } from '../../styles.js'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  textContainer: {
    position: 'relative',
    marginBottom: 20
  },

  text: {
    ...feedbackMessage,
    color: dangerColor
  }
})

export default styles
