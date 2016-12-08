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
    fontSize: Platform.select({
      ios: 92,
      android: 50
    })
  },
  active: {
    opacity: 1
  }
})

export default styles
