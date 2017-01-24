import { StyleSheet, Dimensions } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

const { width } = Dimensions.get('window')
const horizontalMargin = 35

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  tabBar: {
    backgroundColor: DARK_COLOR,
    width: width - horizontalMargin,
    alignSelf: 'center',
    marginBottom: 10
  }
})

export default styles
