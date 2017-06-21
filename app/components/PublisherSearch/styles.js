import { StyleSheet, Platform } from 'react-native'
export const height = 50
export const textColor = '#999999'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height,
    justifyContent: 'center',
    flexGrow: 6
  },

  search: {
    position: 'relative',
    backgroundColor: '#DFE0E6',
    borderRadius: 2
  },

  icon: {
    position: 'absolute',
    top: 6,
    left: 12
  },

  close: {
    position: 'absolute',
    top: 3,
    right: 3,
    paddingHorizontal: 5,
    paddingVertical: 5
  },

  searchInput: {
    position: 'relative',
    color: textColor,
    fontSize: 14,
    fontWeight: '400',
    height: 35,
    borderRadius: 2,
    padding: 5,
    marginLeft: 35,
    marginRight: Platform.select({
      ios: 0,
      android: 35
    })
  }
})

export default styles
