import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')
const buttonWidth = 40
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1'
  },
  listContainer: {
    width: width - buttonWidth
  }
})

export default styles
