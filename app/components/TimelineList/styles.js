import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F8',
    marginBottom: Platform.select({
      android: 0,
      ios: 20
    })
  }
})

export default styles
