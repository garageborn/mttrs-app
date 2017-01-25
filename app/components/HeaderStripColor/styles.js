import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width } = Dimensions.get('window')

const androidStyles = Platform.select({
  android: {
    width
  }
})

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    height: 2,
    left: 0,
    bottom: 0,
    zIndex: 1,
    ...androidStyles
  },

  strip: {
    backgroundColor: '#999',
    height: 2,
    width
  }
})

export default styles
