import { Platform, StyleSheet } from 'react-native'
import dialogStyles from '../../styles/Dialog'

const styles = StyleSheet.create({
  publisher: {
    ...dialogStyles,
    top: Platform.select({
      ios: 20,
      android: 10
    }),
    right: 75
  },
  favorite: {
    ...dialogStyles,
    top: Platform.select({
      ios: 20,
      android: 10
    }),
    right: 70
  }
})

export default styles
