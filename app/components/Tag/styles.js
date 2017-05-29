import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
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
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  last: {
    marginRight: 20
  }
})

export default styles
