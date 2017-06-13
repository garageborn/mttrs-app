import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: Platform.select({
      ios: 12,
      android: 15
    })
  },
  text: {
    fontSize: 14,
    color: '#FFF'
  }
})

export default styles
