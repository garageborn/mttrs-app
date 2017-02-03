import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: Platform.select({
      ios: 24,
      android: 18
    }),
    fontWeight: '500',
    color: '#999'
  }
})

export default styles
