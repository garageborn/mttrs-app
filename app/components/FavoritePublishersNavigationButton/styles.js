import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: {
    position: 'absolute',
    left: -10,
    height: 40,
    width: 10,
    backgroundColor: 'transparent'
  }
})

export default styles
