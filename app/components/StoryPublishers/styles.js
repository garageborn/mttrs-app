import { Dimensions, StyleSheet } from 'react-native'
export const smallDevice = Dimensions.get('window').width < 520

const styles = StyleSheet.create({
  lightText: {
    fontSize: 14,
    color: '#999'
  },

  darkText: {
    fontSize: 14,
    color: '#666766'
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingRight: 10,
    backgroundColor: '#F7F7F8',
    borderRadius: 40
  },

  publisherLogo: {
    width: 24,
    height: 24
  }
})

export default styles
