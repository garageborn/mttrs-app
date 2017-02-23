import { Platform, StyleSheet } from 'react-native'

export const activeHeight = 9
export const inactiveHeight = 3

const activeFlexGrow = Platform.select({
  ios: 1.075,
  android: 1
})

const styles = StyleSheet.create({
  inactive: {
    flexGrow: 1,
    height: inactiveHeight
  },

  active: {
    flexGrow: activeFlexGrow
  }
})

export default styles
