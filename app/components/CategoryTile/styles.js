import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
const iphoneWidthSmall = 320

const categoryVerticalMargin = Platform.select({
  ios: width === iphoneWidthSmall ? 6 : 8.5,
  android: 4
})

const imageHeight = Platform.select({
  ios: 88,
  android: 80
})

const tileWidth = (width - 51) / 2

const styles = StyleSheet.create({
  container: {
    height: height / 8,
    marginHorizontal: 7.5,
    marginVertical: categoryVerticalMargin
  },

  category: {
    backgroundColor: 'transparent',
    width: tileWidth,
    height: height / 7.5,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: Platform.select({
      ios: 2,
      android: 7
    })
  },

  image: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: tileWidth,
    height: imageHeight
  },

  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: Platform.select({
      ios: '500',
      android: '300'
    }),
    marginBottom: 10
  },

  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    width: tileWidth,
    height: 10
  }
})

export default styles
