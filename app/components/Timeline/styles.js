import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from '../../styles/Global'
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  hideRefreshControl: {
    left: 20
  },

  listView: {
    flexGrow: 1,
    height: height - headerHeight,
    width,
    top: Platform.select({
      ios: 0,
      android: 20
    })
  }
})

export default styles
