import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
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
    fontWeight: '600',
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 12
  },
  first: {
    marginLeft: 10
  }
})

export default styles
