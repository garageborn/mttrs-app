import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')
const heightOffset = Platform.OS === 'ios' ? 100 : 110

const styles = StyleSheet.create({
  container: {
    width: width - 16,
    height: height - heightOffset,
    paddingBottom: 2,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 4,
    backgroundColor: '#FFF'
  },

  publisherName: {
    fontWeight: 'bold'
  }
})

export default styles
