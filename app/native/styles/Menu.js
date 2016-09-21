import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

let { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#F5F8FA'
  },

  menuContainer: {
    flex: 1
  },

  topStories: {
    backgroundColor: '#FFF',
    margin: 5,
    borderRadius: 5,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  categories: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5
  },

  category: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    width: (width - 20) / 2,
    height: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles
