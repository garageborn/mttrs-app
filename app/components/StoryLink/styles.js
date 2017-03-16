import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingTop: 1,
    backgroundColor: 'rgba(38,44,91,.1)'
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

  publisherInfo: {
    marginLeft: 5
  },

  publisherName: {
    fontSize: 16,
    color: '#666666',
    fontWeight: Platform.select({
      ios: '700',
      android: '500'
    })
  },

  story: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6
  },

  storyTitle: {
    fontSize: 14,
    width: width - 110,
    paddingRight: 40,
    letterSpacing: -0.73,
    lineHeight: 22,
    color: '#333333',
    fontWeight: '500'
  },

  shares: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  shareIcon: {
    width: 10,
    height: 16,
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
