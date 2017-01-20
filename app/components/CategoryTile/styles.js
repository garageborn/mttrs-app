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
    backgroundColor: '#555',
    width: (width - 51) / 2,
    height: height / 7.5,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 2
  },

  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10
  }
})

export default styles
