import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    height: 55,
    paddingLeft: 30,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F8FA'
  },

  publisher: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  logo: {
    marginRight: 12
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#373737'
  },

  time: {
    fontSize: 11,
    color: '#A9AAAC'
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  iconHighlight: {
    marginHorizontal: 15
  },

  iconClose: {
    marginBottom: 1
  }
})

export default styles
