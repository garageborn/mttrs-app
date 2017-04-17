import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

let imageSize = 120
let imagePadding = 40

let image = imageSize + imagePadding

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    width: width - image
  },

  title: {
    color: '#2D2D2B',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500'
  },

  visited: {
    opacity: 0.6
  }
})

export default styles
