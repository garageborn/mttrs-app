import { StyleSheet, Platform } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

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
    // backgroundColor: '#FFF',
    height: 2
  }
})

export default styles
