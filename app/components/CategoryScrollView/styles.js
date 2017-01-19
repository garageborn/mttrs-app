import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const iphoneWidthSmall = 320

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: width === iphoneWidthSmall ? 8 : 10
  }
})

export default styles
