import { StyleSheet, Dimensions, Platform } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        height: 55
      }
    }),
    paddingTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DARK_COLOR
  },

  header: {
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingLeft: 15,
    width
  },

  publisherInfo: {
    marginLeft: 12
  },

  publisher: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    opacity: 0.8
  },

  storyTitle: {
    flexGrow: 1,
    fontSize: 14,
    width: 200,
    color: '#FFF'
  },

  actions: {
    position: 'relative',
    right: 0,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  iconHighlight: {
    padding: 5
  },

  iconCloseHighlight: {
    marginHorizontal: 15,
    marginBottom: Platform.select({
      ios: 0,
      android: 3
    })
  }
})

export default styles
