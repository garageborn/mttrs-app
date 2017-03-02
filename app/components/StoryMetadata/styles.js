import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F1F1F1'
  },

  visited: {
    opacity: 0.5
  },

  shares: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  shareIcon: {
    width: 8,
    height: 13,
    marginRight: 5,
    marginTop: -1
  },

  shareCount: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999'
  }
})

export default styles
