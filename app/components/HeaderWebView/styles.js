import { StyleSheet, Platform } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 10
      },
      android: {
        paddingTop: 5,
        height: 55
      }
    }),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DARK_COLOR
  },

  header: {
    flexDirection: 'row'
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
  },

  iconCloseHighlight: {
    paddingHorizontal: 10
  }
})

export default styles
