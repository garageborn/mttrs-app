import { StyleSheet } from 'react-native'

const orange = '#FF5607'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 2,
    elevation: 2
  },

  transparent: {
    backgroundColor: 'transparent'
  },

  timelineAd: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0B9CFF',
    borderRadius: 5,
  },

  timelineAdText: {
    color: '#0B9CFF'
  },

  action: {
    backgroundColor: '#23E2D4'
  },

  actionText: {
    color: '#000'
  },

  danger: {
    backgroundColor: orange
  },

  inactive: {
    backgroundColor: '#999'
  },

  inactiveText: {
    color: 'gray'
  },

  regular: {
    width: 130
  },

  regularText: {
    fontSize: 15
  },

  largeText: {
    fontSize: 24
  },

  transparentText: {
    color: orange
  },

  text: {
    fontWeight: '500',
    textAlign: 'center'
  }
})

export default styles
