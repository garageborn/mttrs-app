import { StyleSheet, Platform } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'
export const textColor = '#DADADA'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: DARK_COLOR,
    height: 50,
    justifyContent: 'center',
    elevation: 4
  },

  search: {
    position: 'relative',
    backgroundColor: '#787877',
    marginHorizontal: 10,
    borderRadius: 2,
    elevation: 2
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
