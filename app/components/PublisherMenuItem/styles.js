import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  publisher: {
    backgroundColor: '#434341',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2D2D2B'
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
  }
})

export default styles
