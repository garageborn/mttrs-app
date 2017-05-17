import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')
const imageSize = 50
const imagePadding = 40

const image = imageSize + imagePadding

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    marginRight: 10
  },
  image: {
    height: imageSize,
    width: imageSize
  },
  title: {
    fontSize: 15,
    color: 'black',
    width: width - image
  },
  subtitle: {
    fontSize: 10,
    color: '#AAAAAA'
  }
})

export default styles
