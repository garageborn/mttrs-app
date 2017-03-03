import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#434341',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2D2D2B'
  },

  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  rightContainer: {
    marginRight: 12
  },

  name: {
    fontSize: 16,
    fontWeight: Platform.select({
      ios: '500',
      android: '400'
    }),
    color: '#FFF',
    marginLeft: 10
  },

  touch: {
    backgroundColor: '#F1F1F1'
  },

  count: {
    fontSize: 14,
    color: '#999999'
  }
})

export default styles
