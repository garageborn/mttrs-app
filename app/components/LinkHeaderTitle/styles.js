import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')
const containerWidthBase = 1.33

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: width / containerWidthBase,
    alignItems: 'flex-start'
  }
})

export default styles
