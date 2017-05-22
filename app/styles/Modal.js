import { StyleSheet, Dimensions, Platform } from 'react-native'
import { DARK_COLOR } from '../constants/Colors'
const { height } = Dimensions.get('window')
const heightOffset = Platform.OS === 'ios' ? 100 : 110

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 10,
      android: 0
    }),
    backgroundColor: DARK_COLOR
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height - heightOffset
  }
})

export default styles
