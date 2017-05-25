import { StyleSheet, Dimensions, Platform } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'
const { width, height } = Dimensions.get('window')
const heightOffset = Platform.OS === 'ios' ? 90 : 110
const widthOffeset = 16

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_COLOR,
    width: width - widthOffeset,
    height: height - heightOffset,
    marginHorizontal: widthOffeset / 2,
    marginTop: 20
  },

  options: {
    flex: 1
  }
})

export default styles
