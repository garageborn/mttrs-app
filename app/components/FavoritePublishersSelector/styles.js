import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')
const buttonWidth = 40
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowColor: '#000',
    shadowOpacity: 0.25
  },
  listContainer: {
    width: width - buttonWidth
  }
})

export default styles
