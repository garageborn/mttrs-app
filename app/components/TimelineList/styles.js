import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.select({
      android: 0,
      ios: 10
    })
  }
})

export default styles
