import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from '../../styles/Global'
import { DARK_COLOR } from '../../constants/Colors'
import { height as menuSettingsHeight } from '../MenuSettingsLabel/styles'

const { width, height } = Dimensions.get('window')
const iphoneWidthSmall = 320
const selectorHeight = width === iphoneWidthSmall ? 50 : 60

const styles = StyleSheet.create({
  menu: {
    flexGrow: 1,
    backgroundColor: DARK_COLOR,
    zIndex: 1,
    marginTop: Platform.select({
      ios: 10,
      android: 0
    }),
    height: height - headerHeight
  },

  selector: {
    paddingHorizontal: 45,
    height: selectorHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuContainer: {
    flex: 1
  }
})

export default styles
