import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    height: 75,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
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
    alignItems: 'center'
  },

  iconClose: {
    marginLeft: 20
  }
})

export default styles
