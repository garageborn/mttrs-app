import { StyleSheet, Platform } from 'react-native'

const defaultList = {
  flexGrow: 1,
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
  height: 12,
  bottom: 6,
  zIndex: 1
}

const styles = StyleSheet.create({
  list: {
    ...defaultList
  },
  linkList: {
    ...defaultList,
    bottom: Platform.select({
      ios: -17,
      android: -6
    })
  }
})

export default styles
