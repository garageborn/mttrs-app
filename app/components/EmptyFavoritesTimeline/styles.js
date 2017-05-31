import { StyleSheet, Dimensions } from 'react-native'
import { headerHeight } from '../../styles/Global'
const { width, height } = Dimensions.get('window')
export const headingColor = '#999999'

const styles = StyleSheet.create({
  container: {
    height: height - headerHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },

  bg: {
    position: 'absolute',
    top: 0,
    width
  },

  icon: {
    alignSelf: 'center',
    marginBottom: 16
  },

  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  headingContainer: {
    padding: 20,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textStyle: {
    textAlign: 'center'
  }
})

export default styles
