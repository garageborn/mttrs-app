import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headingContainer: {
    width: width * 0.70
  }
})

export default styles
