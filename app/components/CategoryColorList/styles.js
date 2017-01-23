import { StyleSheet, Platform } from 'react-native'

const defaultList = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  height: 12,
  bottom: -6,
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
