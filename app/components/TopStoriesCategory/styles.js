import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.02,
    marginBottom: 5
  },

  topStories: {
    backgroundColor: '#FFF',
    width: width - 35,
    height: height / 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    marginLeft: 12,
    marginTop: -4,
    color: '#FF5607',
    fontSize: 18
  }
})

export default styles
