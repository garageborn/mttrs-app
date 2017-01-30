import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from './Global'
const { width, height } = Dimensions.get('window')

const containerStyles = {
  flexGrow: 1,
  height: height - headerHeight,
  width
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles,
    backgroundColor: '#F1F1F1'
  },

  loading: {
    ...containerStyles,
    alignItems: 'center',
    justifyContent: 'center'
  },

  loadingText: {
    color: '#999999'
  },

  listViewContainer: {
    flex: 1,
    position: 'absolute',
    ...containerStyles
  },

  listView: {
    ...containerStyles,
    top: Platform.select({
      ios: 15,
      android: 0
    })
  },

  hideRefreshControl: {
    left: 20
  },

  infiniteScrollLoadingContainer: Platform.select({
    ios: {
      padding: 10,
      marginBottom: 20
    },
    android: {
      marginBottom: 30
    }
  })
})

export default styles
