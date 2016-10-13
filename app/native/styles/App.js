import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato'
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  loadingText: {
    color: '#999999'
  },

  listView: {
    backgroundColor: '#F1F1F1',
    width: width
  },

  hideRefreshControl: {
    left: 20
  }
})

export default styles
