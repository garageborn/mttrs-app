import { StyleSheet } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 6
  },
  icon: {
    marginBottom: 5
  },
  text: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center'
  },
  textFocused: {
    color: DARK_COLOR,
    fontSize: 14,
    textAlign: 'center'
  }
})

export default styles
