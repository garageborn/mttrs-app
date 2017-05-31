import { StyleSheet, Platform } from 'react-native'

export const height = 35

const styles = StyleSheet.create({
  header: {
    height,
    paddingTop: 5,
    backgroundColor: '#F7F7F8',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#999999'
  }

})

export default styles
