import { StyleSheet, Platform } from 'react-native'
import { headerHeight } from './Header.js'
import { DARK_COLOR } from '../../constants/Colors'

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        paddingTop: 15
      },
      android: {
        height: 55
      }
    }),
    paddingLeft: 28,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DARK_COLOR
  },

  publisherInfo: {
    marginLeft: 12
  },

  publisher: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    opacity: 0.8
  },

  storyTitle: {
    fontSize: 14,
    width: 150,
    color: '#FFF'
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  iconHighlight: {
    marginHorizontal: 8,
    padding: 5
  },

  iconClose: {
    marginBottom: 1
  }
})

export default styles
