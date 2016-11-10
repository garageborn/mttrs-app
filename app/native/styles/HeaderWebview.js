import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        height: 75,
        paddingTop: 20
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
    backgroundColor: '#262C5B'
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
