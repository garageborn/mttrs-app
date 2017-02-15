import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        height: 60,
        paddingTop: 20
      },
      android: {
        height: 65,
        paddingTop: 30
      }
    }),
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
