import { StyleSheet } from 'react-native'
import TabBarBottom from '../../styles/TabBarBottom'
const container = {
  flexGrow: 1,
  paddingHorizontal: 10,
}
const styles = StyleSheet.create({
  container: {
    ...container,
    marginBottom: TabBarBottom.height
  },
  containerWithSuggestions: {
    ...container
  }
})

export default styles
