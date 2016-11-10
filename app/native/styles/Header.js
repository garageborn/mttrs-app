import { StyleSheet, Platform } from 'react-native'

export const headerHeight = Platform.select({
  ios: 75,
  android: 55
})

const styles = StyleSheet.create({
  header: {
    height: headerHeight,
    ...Platform.select({
      ios: {
        // paddingTop: 35
      },
      android: {
        // paddingTop: 18
      }
    }),
    // backgroundColor: '#262C5B',
    zIndex: 2
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4
  },

  headerTitle: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    color: '#FFF'
  },

  icon: {
    marginTop: 3,
    width: 19,
    height: 20
  }
})

export default styles
