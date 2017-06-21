import { Dimensions, Platform, StyleSheet } from 'react-native'
import dialogStyles from '../../styles/Dialog'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  modal: {
    ...dialogStyles,
    borderRadius: 4,
    width: 240,
    alignSelf: 'center',
    padding: 10,
    marginTop: height / 3,
    marginLeft: 8
  },
  untied: {
    ...dialogStyles,
    top: Platform.select({
      ios: 20,
      android: 10
    }),
    right: 10
  }
})

export default styles
