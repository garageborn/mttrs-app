import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')
const headerHeight = Platform.OS === 'ios' ? 75 : 55

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
    width
  },

  listView: {
    ...containerStyles
  },

  hideRefreshControl: {
    left: 20
  }
})

export default styles
