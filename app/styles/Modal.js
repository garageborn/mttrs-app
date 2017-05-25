import { StyleSheet, Dimensions, Platform } from 'react-native'
const { height } = Dimensions.get('window')
const heightOffset = Platform.OS === 'ios' ? 100 : 110

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 10,
      android: 0
    }),
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height - heightOffset
  }
})

export default styles
