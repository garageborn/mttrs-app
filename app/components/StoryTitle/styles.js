import { StyleSheet, Dimensions, Platform } from 'react-native'
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
    lineHeight: Platform.select({ ios: 24, android: 26 }),
    fontWeight: '500'
  }
})

export default styles
