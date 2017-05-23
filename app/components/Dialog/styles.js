import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    height,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 45, 43, .80)',
    width
  },
  overlay: {
    height,
    width
  }
})

export default styles
