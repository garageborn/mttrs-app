import { StyleSheet, Dimensions } from 'react-native'
let { width } = Dimensions.get('window')

export const bannerWidth = width - 40
export const bannerHeight = 132

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 2,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 2,
    elevation: 2,
    shadowOffset: {
      width: 3,
      height: 2
    }
  }
})

export default styles
