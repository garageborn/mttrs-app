import { StyleSheet, Dimensions, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 5,
    opacity: .50
  },
  text: {
    fontSize: 92
  },
  active: {
    opacity: 1
  }
})

export default styles
