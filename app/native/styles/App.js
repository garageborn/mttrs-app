import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
const { height } = Dimensions.get('window')
const headerSpacing = 120

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  loading: {
    height: height - headerSpacing,
    alignItems: 'center',
    justifyContent: 'center'
  },

  listView: {
    backgroundColor: '#FFF'
  }
})

export default styles
