import { StyleSheet } from 'react-native'
import { headerHeight } from './Global.js'
import { DARK_COLOR } from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_COLOR,
    height: headerHeight,
    zIndex: 1
  }
})

export default styles
