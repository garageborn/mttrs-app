import { StyleSheet, Platform } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        height: 55
      }
    }),
    paddingTop: 10,
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
    width: Platform.select({
      ios: 150,
      android: 180
    }),
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

  iconClose: Platform.select({
    ios: {
      marginBottom: 1
    },
    android: {
      marginBottom: 5,
      marginLeft: 25
    }
  }),

  iconCloseHighlight: {
    paddingHorizontal: 10
  }
})

export default styles
