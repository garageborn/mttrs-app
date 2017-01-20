import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.02,
    marginBottom: 5
  },

  topStories: {
    backgroundColor: '#555',
    width: width - 35,
    height: height / 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 2
  },

  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10
  }
})

export default styles
