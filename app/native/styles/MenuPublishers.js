import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  search: {
    position: 'relative',
    backgroundColor: '#FFF',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 2,
    borderRadius: 5
  },

  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 15
  },

  searchInput: {
    position: 'relative',
    backgroundColor: '#FFF',
    color: '#373737',
    fontSize: 14,
    height: 33,
    borderRadius: 5,
    padding: 5,
    marginLeft: 35
  },

  listContainer: {
    flex: 1
  },

  listHeader: {
    color: '#3E749B',
    fontWeight: 'bold',
    fontSize: 23,
    paddingLeft: 15,
    marginTop: 8,
    paddingTop: 8,
    marginBottom: 8,
    paddingBottom: 8
  },

  publisher: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    marginLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ECECEC'
  },

  logo: {
    marginRight: 16
  },

  name: {
    fontSize: 14,
    fontWeight: '500'
  },

  touch: {
    backgroundColor: '#FFF'
  }
})

export default styles
