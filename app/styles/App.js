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
    backgroundColor: '#F1F1F1',
    paddingBottom: 15
  },

  loadingText: {
    color: '#999999'
  },

  listViewContainer: {
    position: 'absolute',
    top: Platform.select({
      ios: 10,
      android: 0
    }),
    ...containerStyles
  },
  listViewWithTags: {
    top: 55
  }
})

export default styles
