import { StyleSheet } from 'react-native'
// const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },

  image: {
    width: 120,
    height: 90,
    borderWidth: 2,
    borderColor: '#F1F1F1'
  },

  storyTitle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },

  title: {
    fontSize: 20,
    fontWeight: '400'
  }
})

export default styles
