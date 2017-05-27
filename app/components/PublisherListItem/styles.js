import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(153, 153, 153, .20)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20
  },

  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  rightContainer: {
    width: 40
  },

  name: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666766',
    marginLeft: 10
  }
})

export default styles
