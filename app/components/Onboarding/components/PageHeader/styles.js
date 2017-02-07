import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  header: {
    paddingVertical: Platform.select({
      ios: 20,
      android: 18
    }),
    flexDirection: 'row'
  }
})

export default styles
