import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 10 : 40,
    marginHorizontal: 10
  },

  listHeader: {
    paddingLeft: 15,
    marginTop: 8,
    paddingTop: 8,
    marginBottom: 3,
    paddingBottom: 3
  },

  listHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
})

export default styles