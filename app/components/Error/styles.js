import { StyleSheet, Dimensions } from 'react-native'
import { headerHeight } from '../../styles/Global'
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -headerHeight,
    height,
    width,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bg: {
    position: 'absolute',
    top: 0,
    width
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

  textInDark: {
    color: '#F1F1F1'
  },

  textInLight: {
    color: '#999999'
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
