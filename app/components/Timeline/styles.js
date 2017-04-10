import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from '../../styles/Global'
const { width, height } = Dimensions.get('window')

const containerStyles = {
  flexGrow: 1,
  height: height - headerHeight,
  width
}

const styles = StyleSheet.create({
  loading: {
    ...containerStyles,
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    ...Platform.select({
      ios: {
        top: 15,
        bottom: 0,
        paddingBottom: 0,
        // paddingTop: 20
      },
      android: {
        top: 0,
        bottom: 0,
        paddingBottom: 25
      }
    }),
    flexGrow: 1,
    backgroundColor: '#F1F1F1'
  },

  infiniteScrollLoadingContainer: {
    padding: 10,
    marginBottom: 20
  },

  hideRefreshControl: {
    left: 20
  }
})

export default styles
