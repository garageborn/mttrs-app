import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'

let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 16,
    paddingLeft: 12,
    paddingRight: 12
  },

  cardHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 2,
    borderTopColor: '#0076FF',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  category: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  categoryIcon: {
    marginRight: 10
  },

  categoryTitle: {
    color: '#0076FF',
    fontSize: 12
  },

  publisher: {
    flexDirection: 'row'
  },

  publisherLogo: {
    width: 12,
    height: 15
  },

  publisherTitle: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10
  },

  cover: {
    width: width - 24,
    height: 225
  },

  coverImage: {
    position: 'relative',
    flex: 1
  },

  coverOverlay: {
    position: 'absolute',
    bottom: 0,
    width: width - 24,
    height: 225
  },

  title: {
    position: 'absolute',
    fontSize: 22,
    bottom: 20,
    padding: 10,
    color: '#FFF'
  },

  story: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },

  storyThumb: {
    width: 100,
    height: 75,
    marginRight: 10
  },

  storyTitleContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  storyInfo: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#AAA',
    fontSize: 12
  },

  storyInfoFrom: {
    fontWeight: 'normal'
  }
})

export default styles
