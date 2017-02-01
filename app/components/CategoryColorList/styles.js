import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 12,
    bottom: Platform.select({
      ios: 7,
      android: 7
    }),
    zIndex: 1
  }
})

export default styles
