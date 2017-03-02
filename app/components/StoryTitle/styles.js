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
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500'
  },

  visited: {
    opacity: 0.5
  }
})

export default styles
