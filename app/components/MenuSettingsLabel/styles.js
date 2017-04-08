import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')
const settingsHeight = Platform.select({
  ios: 50,
  android: 40
})
const settingsBottom = Platform.select({
  ios: 10,
  android: 10
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
    ...Platform.select({
      android: {
        width: 15,
        height: 15
      }
    }),
    marginHorizontal: 10
  },

  settingsTitle: {
    fontSize: Platform.select({
      ios: 12,
      android: 10
    }),
    bottom: 1,
    color: '#F1F1F1'
  },

  tenant: {
    fontSize: Platform.select({
      ios: 12,
      android: 10
    }),
    marginLeft: 16,
    color: '#F1F1F1'
  },

  touchContainer: {
    ...centerXY,
    padding: Platform.select({
      ios: 10,
      android: 5
    })
  }
})

export default styles
