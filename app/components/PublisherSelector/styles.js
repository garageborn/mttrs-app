import { Dimensions, StyleSheet } from 'react-native'
const { height } = Dimensions.get('window')
const headerHeight = 44
const tabBarHeight = 49
const searchBarHeight = 35
const statusBarHeight = 35

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F8',
    flexGrow: 1
  },
  contentContainer: {
    height: height - headerHeight - tabBarHeight - searchBarHeight - statusBarHeight
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default styles
