import { StyleSheet } from 'react-native'

const paginatorActions = {
  fontSize: 12,
  padding: 10
}

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
    width: 70,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  buttonRight: {
    width: 70,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  skip: {
    color: '#DADADA',
    ...paginatorActions
  },

  start: {
    color: '#FF5607',
    ...paginatorActions
  }
})

export default styles
