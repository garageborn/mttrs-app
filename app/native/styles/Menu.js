import { StyleSheet, Dimensions } from 'react-native'

let { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#F5F8FA',
    zIndex: 1
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
    width: (width - 15) / 2,
    height: 100,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  categoryTouch: {
    height: 105
  },

  categoryIcon: {
    marginBottom: 12
  },

  categoryName: {
    fontSize: 14
  },

  isActive: {
    borderWidth: 6,
    borderColor: '#373737'
  }
})

export default styles
