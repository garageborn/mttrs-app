import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bg: {
    position: 'absolute',
    top: 0
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    backgroundColor: 'transparent',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'center'
  },

  buttonContainer: {
    marginTop: 16,
    alignSelf: 'center'
  },

  buttonText: {
    color: '#FF5607',
    fontSize: 24,
    fontWeight: '500'
  },

  icon: {
    alignSelf: 'center',
    marginBottom: 16
  }
})

export default styles
