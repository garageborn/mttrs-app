import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
const headerHeight = (Platform.OS === 'ios') ? 75 : 55

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    height,
    width
  },

  loading: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },

  loadingText: {
    color: '#999999'
  },

  listViewContainer: {
    flex: 1,
    position: 'absolute',
    height: height - headerHeight,
    width
  },

  listView: {
    flex: 1,
    height,
    width
  },

  hideRefreshControl: {
    left: 20
  }
})

export default styles
