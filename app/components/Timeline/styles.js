import { Dimensions, StyleSheet } from 'react-native'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  loadingContainer: {
    height,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  infiniteScrollLoadingContainer: {
    height: 50,
    padding: 10,
    marginBottom: 20
  },

  hideRefreshControl: {
    left: 20
  }
})

export default styles
