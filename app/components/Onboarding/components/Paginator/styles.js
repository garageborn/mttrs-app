import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonLeft: {
    width: 95,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 5
  },

  buttonRight: {
    width: 95,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  skip: {
    color: '#DADADA',
    fontSize: 12,
    padding: 10
  },

  start: {
    color: '#FF5607',
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  }
})

export default styles
