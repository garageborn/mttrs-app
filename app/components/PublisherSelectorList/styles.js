import { StyleSheet } from 'react-native'
import TabBarBottom from '../../styles/TabBarBottom'
const searchBarHeight = 50

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginBottom: TabBarBottom.height + searchBarHeight
  }
})

export default styles
