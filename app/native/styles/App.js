import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1'
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
    position: 'absolute',
    height
  },

  listView: {
    backgroundColor: '#F1F1F1',
    width
  },

  hideRefreshControl: {
    left: 20
  }
})

export default styles
