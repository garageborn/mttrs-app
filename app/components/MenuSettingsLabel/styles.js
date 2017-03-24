import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')
const settingsHeight = Platform.select({
  ios: 50,
  android: 70
})
const settingsBottom = Platform.select({
  ios: 10,
  android: 20
})
export const height = settingsHeight + settingsBottom

const centerXY = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}

const styles = StyleSheet.create({
  settings: {
    ...centerXY,
    height: settingsHeight,
    width,
    position: 'absolute',
    bottom: settingsBottom,
    opacity: 0.4
  },

  image: {
    marginHorizontal: 10
  },

  settingsTitle: {
    fontSize: 12,
    bottom: 1,
    color: '#F1F1F1'
  },

  tenant: {
    fontSize: 12,
    marginLeft: 16,
    color: '#F1F1F1'
  },

  touchContainer: {
    ...centerXY
  }
})

export default styles
