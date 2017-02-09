import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from '../../styles/Global'
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F1F1',
    height: Platform.select({
      ios: height - headerHeight - 20,
      android: height - headerHeight
    }),
    width
  }
})

export default styles
