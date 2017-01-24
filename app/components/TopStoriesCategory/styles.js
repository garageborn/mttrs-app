import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const tileWidth = width - 35

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.02,
    marginBottom: 5
  },

  topStories: {
    backgroundColor: '#555',
    width: tileWidth,
    height: height / 8,

    borderBottomWidth: 2
  },

  image: {
    width: tileWidth,
    height: 81,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  name: {
    backgroundColor: 'transparent',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10
  },

  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    width: tileWidth,
    height: height / 8
  }
})

export default styles
