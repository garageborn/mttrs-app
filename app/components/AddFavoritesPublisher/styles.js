import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')
const columnsNumber = 4
const itemSize = width / columnsNumber

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexGrow: 1,
    height: itemSize,
    width: itemSize,
    alignItems: 'center'
  },
  inactiveIcon: {
    opacity: 0.5
  },
  activeIcon: {
    opacity: 1
  },
  text: {
    marginTop: 10,
    fontSize: 10,
    color: '#999999',
    textAlign: 'center'
  }
})

export default styles
