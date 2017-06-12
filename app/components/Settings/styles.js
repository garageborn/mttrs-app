import { StyleSheet, Dimensions, Platform } from 'react-native'
const { height } = Dimensions.get('window')

export const smallTextColor = '#999999'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F8',
    height: height
  },

  footerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10
  }
})

export default styles
