import { StyleSheet, Dimensions } from 'react-native'
import { headerHeight } from '../../styles/Global'
const { width, height } = Dimensions.get('window')

const containerStyles = {
  flex: 1,
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
    ...containerStyles,
    backgroundColor: '#F1F1F1'
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
