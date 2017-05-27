import { StyleSheet } from 'react-native'

const orange = '#FF5607'

const shadow = {
  elevation: 2,
  shadowOffset: {
    width: 2,
    height: 2
  },
  shadowColor: '#000',
  shadowOpacity: 0.25
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 2
  },

  transparent: {
    backgroundColor: 'transparent'
  },

  timelineAd: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0B9CFF',
    borderRadius: 5
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
    ...shadow,
    backgroundColor: orange
  },

  dangerText: {
    color: '#FFFFFF'
  },

  inactive: {
    backgroundColor: '#DCDCDC'
  },

  inactiveText: {
    color: '#c3c3c3'
  },

  regularText: {
    fontSize: 15
  },

  small: {
    paddingHorizontal: 10
  },

  smallText: {
    fontSize: 14
  },

  large: {

  },

  largeText: {
    fontSize: 20
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
