import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  publisher: {
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDD'
  },

  name: {
    fontSize: 18,
    fontWeight: Platform.select({
      ios: '500',
      android: '400'
    }),
    color: '#666',
    marginLeft: 10
  },

  touch: {
    backgroundColor: '#F1F1F1'
  }
})

export default styles
