import { StyleSheet, Dimensions } from 'react-native'
let { width } = Dimensions.get('window')

export const bannerWidth = width - 40
export const bannerHeight = width * 0.92
const styles = StyleSheet.create({
  container: {
    height: bannerHeight - 15,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 2,
    paddingTop: 10,
    paddingRight: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius: 2,
    elevation: 2,
    shadowOffset: {
      width: 3,
      height: 2
    }
  },
  adContainer: {
    position: 'absolute',
    top: 12,
    left: 5,
    backgroundColor: '#FFF'
  }
})

export default styles
