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

  category: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 3,
    width: 130,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C6DAF'
  },

  categoryTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF'
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
