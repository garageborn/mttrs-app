import { StyleSheet, Dimensions, Platform } from 'react-native'
import { iphoneWidthSmall } from '../../styles/Global'
const { width, height } = Dimensions.get('window')

const categoryVerticalMargin = Platform.select({
  ios: width === iphoneWidthSmall ? 8 : 8.5,
  android: 4
})

const imageHeight = Platform.select({
  ios: width === iphoneWidthSmall ? 75 : 86,
  android: 80
})

const categoryHeightDivider = Platform.select({
  ios: 7.5,
  android: 8
})

const tileWidth = (width - 51) / 2

const styles = StyleSheet.create({
  container: {
    height: height / 8,
    marginHorizontal: 7.5,
    marginVertical: categoryVerticalMargin
  },

  category: {
    backgroundColor: '#555',
    width: tileWidth,
    height: height / categoryHeightDivider,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 2.5
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
    textAlign: 'center',
    fontWeight: Platform.select({
      ios: '500',
      android: '300'
    }),
    marginHorizontal: 5,
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
