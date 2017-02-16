import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  header: {
    height: 45,
    paddingTop: Platform.OS === 'android' ? 5 : 0,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#999999'
  }

})

export default styles
