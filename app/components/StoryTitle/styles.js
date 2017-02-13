import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

let imageSize = 120
let imagePadding = 24

let image = imageSize + imagePadding

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    width: width - image
  },

  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500'
  }
})

export default styles
