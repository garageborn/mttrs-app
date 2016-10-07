import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    height: 45,
    paddingTop: 12,
    backgroundColor: '#262C5B',
    zIndex: 2
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4
  },

  headerTitle: {
    fontSize: 17,
    marginLeft: 10,
    marginRight: 10,
    color: '#FFF'
  },

  icon: {
    width: 23,
    height: 23
  }
})

export default styles
