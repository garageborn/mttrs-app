import { StyleSheet, Platform } from 'react-native'

const defaultList = {
  flexGrow: 1,
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
  height: 12,
  bottom: Platform.select({
    ios: 5,
    android: 7
  }),
  zIndex: 10
}

const styles = StyleSheet.create({
  list: {
    ...defaultList
  },
  linkList: {
    ...defaultList,
    bottom: -5
  }
})

export default styles
