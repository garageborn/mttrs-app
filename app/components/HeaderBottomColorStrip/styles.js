import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  bottomColorWrapper: {
    alignItems: 'center',
    position: 'absolute',
    height: 2,
    bottom: 0,
    zIndex: 1
  },

  bottomColorStrip: {
    backgroundColor: '#999',
    height: 2,
    width
  }
})

export default styles
