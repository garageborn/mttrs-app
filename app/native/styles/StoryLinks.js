import { StyleSheet, Dimensions } from 'react-native'

let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#1B2A45'
  },

  container: {
    width: width - 16,
    height: height - 120,
    paddingBottom: 20,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },

  header: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingTop: 2,
    backgroundColor: '#F5F8FA',
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
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ECECEC'
  },

  headerContainer: {
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
