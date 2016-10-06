import { StyleSheet, Dimensions } from 'react-native'

let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#262C5B',
    zIndex: 1,
    padding: 10,
    marginTop: -12,
    height
  },

  selector: {
    paddingLeft: 60,
    paddingRight: 60,
    height: height * .1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuContainer: {
    flex: 1
  },

  topStories: {
    backgroundColor: '#2672D7',
    width: (width - 35),
    height: height / 7.5,
    marginHorizontal: (width * .02),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * .01
  },

  topStoriesTitle: {
    marginLeft: 12,
    marginTop: -4,
    color: 'white',
    fontSize: 18
  },

  categories: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5
  },

  category: {
    backgroundColor: '#FFF',
    width: (width - 51) / 2,
    height: height / 7.5,
    alignItems: 'center',
    margin: 7.5,
    justifyContent: 'center'
  },

  categoryTouch: {
    height: height / 6.5
  },

  categoryIcon: {
    width: 42,
    height: 42
  },

  categoryName: {
    fontSize: 14,
    fontWeight: 'bold'
  },

  isActive: {
    borderWidth: 3
  }
})

export default styles
