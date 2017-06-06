import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 15,
    right: 24,
    width: 15,
    height: 15,
    zIndex: 2,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  active: {
    borderColor: '#FF5607'
  },
  innerDot: {
    borderRadius: 7,
    width: 7,
    height: 7,
    backgroundColor: '#FF5607'
  }
})

export default styles
