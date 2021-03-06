import { StyleSheet } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCC'
  },

  logo: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#F1F1F1'
  },

  darkLogoContainerSkin: {
    borderColor: '#FFF'
  },

  darkLogoSkin: {
    borderColor: DARK_COLOR
  }
})

export default styles
