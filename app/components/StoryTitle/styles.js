import { StyleSheet, Dimensions } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

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
    color: DARK_COLOR,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500'
  }
})

export default styles
