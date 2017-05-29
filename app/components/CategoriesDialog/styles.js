import { StyleSheet } from 'react-native'
import dialogStyles from '../../styles/Dialog'

const styles = StyleSheet.create({
  publisher: {
    ...dialogStyles,
    top: 10,
    right: 75
  },
  favorite: {
    ...dialogStyles,
    top: 10,
    right: 30
  }
})

export default styles
