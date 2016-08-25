import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  story: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },

  storyThumb: {
    width: 100,
    height: 75,
    marginRight: 10
  },

  storyTitleContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  storyInfo: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#aaa',
    fontSize: 12
  },

  storyInfoFrom: {
    fontWeight: 'normal'
  }
})

export default styles
