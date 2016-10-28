import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
    paddingLeft: 15,
    marginTop: 8,
    paddingTop: 8,
    marginBottom: 3,
    paddingBottom: 3,
  },

  listHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },

  publisher: {
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDDDDD'
  },

  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666666'
  },

  touch: {
    backgroundColor: '#F1F1F1',
  },

  listHeaderImage: {

  }
})

export default styles
