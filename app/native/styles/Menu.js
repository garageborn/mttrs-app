import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

let { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#F5F8FA'
  },

  header: {
    height: 65,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerTitle: {
    marginLeft: 10,
    marginRight: 10
  },

  selector: {
    paddingLeft: 60,
    paddingRight: 60,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuContainer: {
    flex: 1
  },

  topStories: {
    backgroundColor: '#FFF',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  topStoriesTitle: {
    marginLeft: 20,
    marginRight: 20,
    color: '#373737'
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
    width: (width - 15) / 2,
    height: 100,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  categoryIcon: {
    marginBottom: 12
  },

  categoryName: {
    fontSize: 14
  }
})

export default styles
