import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const iphoneWidthSmall = 320
const selectorHeight = width === iphoneWidthSmall ? 50 : 60

const styles = StyleSheet.create({
  selector: {
    paddingHorizontal: 45,
    height: selectorHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuContainer: {
    flexGrow: 1
  }
})

export default styles
