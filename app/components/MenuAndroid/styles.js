import { StyleSheet, Dimensions } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'
const { width, height } = Dimensions.get('window')
import { headerHeight } from '../../styles/Global'
import { height as menuSettingsHeight } from '../MenuSettingsLabel/styles'
const selectorHeight = 60
export const mainComponentHeight = height - (menuSettingsHeight + headerHeight) - selectorHeight

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent'
  },

  tabBar: {
    backgroundColor: DARK_COLOR,
    width,
    alignSelf: 'center',
    marginBottom: 10
  },

  indicatorStyle: {
    backgroundColor: '#F1F1F1'
  }
})

export default styles
