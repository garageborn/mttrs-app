import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')
const settingsHeight = 50
const settingsBottom = Platform.select({
  ios: 10,
  android: 20
})
export const height = settingsHeight + settingsBottom

const centerXY = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

const styles = StyleSheet.create({
  settings: {
    ...centerXY,
    height: settingsHeight,
    width,
    position: 'absolute',
    bottom: settingsBottom
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
    ...centerXY
  }
})

export default styles
