import { StyleSheet } from 'react-native'
import { headerHeight } from '../../styles/Global'

const styles = StyleSheet.create({
  header: {
    height: headerHeight,
    paddingTop: 18,
    zIndex: 2
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4
  },

  headerTitle: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    color: '#FFF'
  },

  icon: {
    marginTop: 3,
    width: 19,
    height: 20
  }
})

export default styles
