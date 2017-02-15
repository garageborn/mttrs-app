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
