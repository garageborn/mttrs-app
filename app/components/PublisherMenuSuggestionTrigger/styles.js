import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#999999',
    height: 34,
    width: 45,
    marginTop: 8,
    marginRight: 12,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#999999',
    fontSize: 30,
    backgroundColor: 'transparent',
    marginBottom: 4
  },
  active: {
    backgroundColor: '#CCC'
  }
})

export default styles
