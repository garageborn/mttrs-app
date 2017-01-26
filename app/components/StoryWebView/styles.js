import { StyleSheet, Dimensions } from 'react-native'
import { headerHeight } from './Global'
const { width, height } = Dimensions.get('window')

const containerStyles = {
  flexGrow: 1,
  height: height - headerHeight,
  width
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles,
    backgroundColor: '#F1F1F1'
  }
})

export default styles
