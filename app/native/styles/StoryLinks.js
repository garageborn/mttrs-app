import { StyleSheet, Dimensions, StatusBar } from 'react-native'

let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height - 220,
    padding: 20,
    marginBottom: 100,
    backgroundColor: '#FFF',
  },

  header: {

  },

  publisherTouch: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ECECEC'
  },

  publisher: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  logo: {
    marginRight: 12
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#373737'
  },

  time: {
    fontSize: 11,
    color: '#A9AAAC'
  },

  storyTitle: {
    fontSize: 16,
    marginTop: 6,
    color: '#373737'
  }
})

export default styles
