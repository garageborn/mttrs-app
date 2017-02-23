import { StyleSheet, Platform } from 'react-native'

export const textColor = '#DADADA'

const styles = StyleSheet.create({
  search: {
    position: 'relative',
    backgroundColor: '#787877',
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: Platform.select({
      ios: 0,
      android: 10
    }),
    borderRadius: 5
  },

  icon: {
    position: 'absolute',
    top: 8,
    left: 12
  },

  searchInput: {
    position: 'relative',
    backgroundColor: '#787877',
    color: textColor,
    fontSize: 14,
    fontWeight: Platform.select({
      ios: '600',
      android: '400'
    }),
    height: 35,
    borderRadius: 2,
    padding: 5,
    marginLeft: 35
  }
})

export default styles
