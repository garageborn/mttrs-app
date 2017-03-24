import { StyleSheet, Platform } from 'react-native'
import { mainComponentHeight as iosHeight } from '../MenuIOS/styles'
import { mainComponentHeight as androidHeight } from '../MenuAndroid/styles'
import { height as publisherSearchHeight } from '../PublisherSearch/styles'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: Platform.select({
      ios: iosHeight - publisherSearchHeight,
      android: (androidHeight - publisherSearchHeight)
    })
  },
  list: {
    padding: 10
  }
})

export default styles
