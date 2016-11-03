import { StyleSheet, Dimensions } from 'react-native'

let { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flex: 1,
    zIndex: 2,
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#FFF'
  },

  category: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 3,
    width: 130,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C6DAF'
  },

  categoryTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF'
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },

  image: {
    width: 120,
    height: 90,
    borderWidth: 2,
    borderColor: '#F1F1F1'
  },

  storyTitle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },

  title: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Open Sans'
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F1F1F1'
  },

  lightText: {
    fontSize: 13,
    color: '#999'
  },

  darkText: {
    fontSize: 13,
    color: '#666'
  },

  publisher: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  publisherLogo: {
    width: 22,
    height: 22
  },

  shares: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  shareIcon: {
    width: 8,
    height: 13,
    marginRight: 5,
    marginTop: -1
  },

  shareCount: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999'
  }
})

export default styles
