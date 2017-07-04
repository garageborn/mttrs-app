import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    height,
    width,
    zIndex: 1,
    flex: 1
  },
  centered: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    height,
    width
  }
})

export default styles
