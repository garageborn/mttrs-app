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
  textPrimary: {
    backgroundColor: 'transparent',
    color: '#999999',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'center'
  },
  textSecondary: {
    backgroundColor: 'transparent',
    color: '#999999',
    fontSize: 12,
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
