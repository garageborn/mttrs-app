import { StyleSheet, Dimensions, Platform } from 'react-native'
// import { DARK_COLOR } from '../../constants/Colors'
const { width, height } = Dimensions.get('window')
const heightOffset = Platform.OS === 'ios' ? 90 : 110
// const widthOffeset = 16

export const smallTextColor = '#999999'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F8',
    height: height - heightOffset
  },

  footerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10
  }
})

export default styles
