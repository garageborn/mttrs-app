import { Dimensions, Platform, StyleSheet } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK_COLOR,
    height: Platform.select({
      ios: 64
    }),
    paddingTop: Platform.select({
      ios: 22
    })
  },

  indicatorStyle: {
    height: 3,
    borderRadius: width / 2
  }
})

export default styles
