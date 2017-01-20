import { StyleSheet } from 'react-native'
// const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
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
