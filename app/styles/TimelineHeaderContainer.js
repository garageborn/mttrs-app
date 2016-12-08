import { StyleSheet } from 'react-native'
import { headerHeight } from './Header.js'
import { DARK_COLOR } from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    height: headerHeight,
    zIndex: 1,
    backgroundColor: DARK_COLOR
  }
})

export default styles
