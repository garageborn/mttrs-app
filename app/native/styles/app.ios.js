import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  loading: {
    height: height - 120,
    alignItems: 'center',
    justifyContent: 'center'
  },

  header: {
    backgroundColor: '#2C2E4A',
    paddingTop: 28,
    alignItems: 'center'
  },

  logo: {
    width: 113,
    height: 28,
    marginBottom: 12
  },

  nav: {
    backgroundColor: '#EA4340',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EA4340',
    padding: 12
  },

  listView: {
    backgroundColor: '#FFF',
    height: height - 120
  }
})

export default styles
