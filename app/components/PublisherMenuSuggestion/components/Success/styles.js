import { StyleSheet } from 'react-native'
import { feedbackMessage, actionColor } from '../../styles.js'

const styles = StyleSheet.create({
  text: {
    ...feedbackMessage,
    color: actionColor
  }
})

export default styles
