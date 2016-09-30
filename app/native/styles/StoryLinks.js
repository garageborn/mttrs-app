import { StyleSheet, Dimensions } from 'react-native'

let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height - 220,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 50,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },

  header: {
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },

  headerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3A7EFE'
  },

  row: {
    backgroundColor: '#FFF'
  },

  firstRow: {
    backgroundColor: '#F5F8FA'
  },

  rowContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ECECEC'
  },

  firstRowContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16
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
