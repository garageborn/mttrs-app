import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from './Header'
const { width, height } = Dimensions.get('window')

const containerStyles = {
  flex: 1,
  height: height - headerHeight,
  width
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles,
    backgroundColor: '#F1F1F1',
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
    marginTop: 15,
    width
  },

  listView: {
    ...containerStyles
  },

  hideRefreshControl: {
    left: 20
  },

  infiniteScrollLoadingContainer: {
    padding: 10,
    marginBottom: 20
  }
})

export default styles
