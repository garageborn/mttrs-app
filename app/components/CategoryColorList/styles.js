import { StyleSheet, Platform } from 'react-native'

const defaultList = {
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

const styles = StyleSheet.create({
  list: {
    ...defaultList
  },
  linkList: {
    ...defaultList,
    bottom: -4
  }
})

export default styles
