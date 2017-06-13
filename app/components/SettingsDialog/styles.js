import { Platform, StyleSheet } from 'react-native'
import dialogStyles from '../../styles/Dialog'

const styles = StyleSheet.create({
  container: {
    ...dialogStyles,
    top: Platform.select({
      ios: 20,
      android: 10
    }),
    right: 10
  }
})

export default styles
