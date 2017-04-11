import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')

const settingsHeight = Platform.select({
  ios: 50,
  android: 35
})

const settingsBottom = Platform.select({
  ios: 10,
  android: 30
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
    flexWrap: 'wrap',
    height: settingsHeight,
    width,
    position: 'absolute',
    bottom: settingsBottom,
    opacity: 0.4
  },

  image: {
    ...Platform.select({
      android: {
        width: 18,
        height: 18
      }
    }),
    marginHorizontal: 10
  },

  settingsTitle: {
    fontSize: 12,
    bottom: 1,
    color: '#F1F1F1'
  },

  tenant: {
    fontSize: 12,
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
