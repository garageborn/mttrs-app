import { StyleSheet, Dimensions } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },

  tabBar: {
    backgroundColor: DARK_COLOR,
    width,
    alignSelf: 'center',
    marginBottom: 10
  },

  indicatorStyle: {
    backgroundColor: '#F1F1F1'
  }
})

export default styles
