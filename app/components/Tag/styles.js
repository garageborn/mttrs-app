import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  active: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#CBCBCB'
  },
  text: {
    color: '#999999',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  last: {
    marginRight: 20
  }
})

export default styles
