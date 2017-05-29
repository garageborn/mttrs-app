import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D2B',
    height: Platform.select({
      ios: 64
    }),
    paddingTop: Platform.select({
      ios: 22
    })
  },

  indicatorStyle: {
    backgroundColor: '#FFF',
    height: 2
  }
})

export default styles
