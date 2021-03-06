import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from '../../styles/Global'
const { width, height } = Dimensions.get('window')

const iOSOffset = -20
const androidOffset = 9

const containerHeight = Platform.select({
  ios: height - headerHeight - iOSOffset,
  android: height - headerHeight + androidOffset
})

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F1F1',
    height: containerHeight
  }
})

export default styles
