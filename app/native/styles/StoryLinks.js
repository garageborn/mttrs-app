import { StyleSheet, Dimensions } from 'react-native'

let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#262C5B'
  },

  container: {
    width: width - 16,
    height: height - 90,
    paddingBottom: 2,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },

  header: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingTop: 1,
    backgroundColor: 'rgba(38,44,91,.1)',
  },

  subHeaderText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 18,
    marginBottom: 5,
    marginHorizontal: 15,
    color: '#3A7EFE',
  },

  row: {
    backgroundColor: '#FFF'
  },

  rowContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDDDDD'
  },

  headerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15
  },

  publisher: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  logo: {
    marginRight: 5,
    height: 30,
    width: 30
  },

  publisherName: {
    fontSize: 20,
    color: '#666666',
    fontWeight: 'bold'
  },

  time: {
    fontSize: 11,
    color: '#A9AAAC'
  },

  storyTitle: {
    fontSize: 16,
    letterSpacing: -.73,
    lineHeight: 22,
    marginTop: 6,
    color: '#333333',
    fontWeight: 'bold'
  },

  linksList: {
    marginBottom: -15
  },

  gradient: {
    height: 15,
    backgroundColor: 'transparent'
  }
})

export default styles
