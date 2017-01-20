import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width } = Dimensions.get('window')
const iphoneWidthLarge = 414

const settingsSectionTopOffset = Platform.select({
  ios: width === iphoneWidthLarge ? 20 : 5,
  android: 0
})

const centerXY = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}

const styles = StyleSheet.create({
  settings: {
    ...centerXY,
    marginTop: settingsSectionTopOffset
  },

  settingsTitle: {
    fontSize: 14,
    color: '#FFF',
    marginHorizontal: 5
  },

  namespace: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    opacity: 0.5
  },

  touchContainer: {
    ...centerXY,
    marginHorizontal: 15
  }
})

export default styles
