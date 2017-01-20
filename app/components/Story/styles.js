import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    zIndex: 2,
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#FFF'
  },

  lightText: {
    fontSize: 13,
    color: '#999'
  },

  darkText: {
    fontSize: 13,
    color: '#666'
  },

  publisher: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  publisherLogo: {
    width: 22,
    height: 22
  }
})

export default styles
