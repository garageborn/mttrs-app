import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
const iphoneWidthSmall = 320

const categoryVerticalMargin = Platform.select({
  ios: width === iphoneWidthSmall ? 6 : 8.5,
  android: 4
})

const styles = StyleSheet.create({
  container: {
    height: height / 8,
    marginHorizontal: 7.5,
    marginVertical: categoryVerticalMargin
  },

  category: {
    backgroundColor: '#FFF',
    width: (width - 51) / 2,
    height: height / 7.5,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  name: {
    fontSize: 14,
    fontWeight: 'bold'
  }
})

export default styles
