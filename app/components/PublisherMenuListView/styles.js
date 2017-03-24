import { StyleSheet } from 'react-native'
import { mainComponentHeight as iosHeight } from '../MenuIOS/styles'
import { height as publisherSearchHeight } from '../PublisherSearch/styles'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: iosHeight - publisherSearchHeight
  },
  list: {
    padding: 10
  }
})

export default styles
