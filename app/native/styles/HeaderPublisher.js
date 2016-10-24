import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    height: 55,
    paddingLeft: 30,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#262C5B'
  },

  publisher: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  logo: {
    marginRight: 12
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
    marginHorizontal: 15,
    padding: 5
  },

  iconClose: {
    marginBottom: 1
  }
})

export default styles
