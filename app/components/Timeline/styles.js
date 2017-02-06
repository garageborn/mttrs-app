import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from '../../styles/Global'
const { width, height } = Dimensions.get('window')

const containerStyles = {
  flexGrow: 1,
  height: height - headerHeight,
  width
}

const styles = StyleSheet.create({
  hideRefreshControl: {
    left: 20
  },
  listView: {
    ...containerStyles,
    top: Platform.select({
      ios: 15,
      android: 0
    })
  },
  infiniteScrollLoadingContainer: Platform.select({
    ios: {
      padding: 10,
      marginBottom: 20
    },
    android: {
      marginBottom: 30
    }
  }),

  loading: {
    ...containerStyles,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles
