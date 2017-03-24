import { StyleSheet, Dimensions } from 'react-native'
import { headerHeight } from '../../styles/Global'
import { height as menuSettingsHeight } from '../MenuSettingsLabel/styles'
const { width, height } = Dimensions.get('window')
const iphoneWidthSmall = 320
export const selectorHeight = width === iphoneWidthSmall ? 50 : 60
export const mainComponentHeight = height - (menuSettingsHeight + selectorHeight + headerHeight)

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },

  selector: {
    paddingHorizontal: 45,
    height: selectorHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuContainer: {
    flexGrow: 1
  }
})

export default styles
