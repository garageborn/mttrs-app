import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from './Header'
import { DARK_COLOR } from '../../constants/Colors'

const { width, height } = Dimensions.get('window')
const iphoneWidthSmall = 320
const topStoriesHeight = Platform.OS === 'ios' ? 100 : 80
const selectorHeight = 60
const menuHeader = headerHeight + topStoriesHeight + selectorHeight
const categoriesContainerHeight = height - menuHeader

const categoryVerticalMargin = Platform.select({
  ios: width === iphoneWidthSmall ? 0 : 2.5,
  android: 0
})

const styles = StyleSheet.create({
  menu: {
    flexGrow: 1,
    backgroundColor: DARK_COLOR,
    zIndex: 1,
    marginTop: Platform.select({
      ios: 10,
      android: 0
    }),
    paddingHorizontal: 10,
    height: height - headerHeight
  },

  selector: {
    paddingHorizontal: 45,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuContainer: {
    flex: 1,
  },

  topStoriesContainer: {
    marginHorizontal: (width * .02),
    marginBottom: height * .02
  },

  topStories: {
    backgroundColor: '#2672D7',
    width: width - 35,
    height: height / 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  topStoriesInactive: {
    backgroundColor: '#FFF'
  },

  topStoriesTitle: {
    marginLeft: 12,
    marginTop: -4,
    color: 'white',
    fontSize: 18
  },

  topStoriesTitleInactive: {
    color: '#2672D7'
  },

  topStoriesIcon: {
    width: 19,
    height: 20
  },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },

  categorySection: {
    width: width - 20
  },

  category: {
    backgroundColor: '#FFF',
    width: (width - 51) / 2,
    height: height / 7.5,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  categoryContainer: {
    height: height / 6.5,
    marginHorizontal: 7.5,
    marginVertical: categoryVerticalMargin
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
