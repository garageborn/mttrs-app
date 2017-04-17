import { StyleSheet, Platform } from 'react-native'

export const height = 35

const styles = StyleSheet.create({
  header: {
    height,
    paddingTop: Platform.OS === 'android' ? 5 : 0,
    backgroundColor: '#F1F1F1',
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
