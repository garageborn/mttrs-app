import { StyleSheet, Dimensions, Platform } from 'react-native'
import { mainComponentHeight as iosHeight } from '../MenuIOS/styles'
import { mainComponentHeight as androidHeight } from '../MenuAndroid/styles'
import { topStoriesHeight } from '../TopStoriesCategory/styles'

const { width } = Dimensions.get('window')
const iphoneWidthSmall = 320

const styles = StyleSheet.create({
  container: {
    height: Platform.select({
      ios: iosHeight - topStoriesHeight,
      android: androidHeight - topStoriesHeight
    }),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginBottom: width === iphoneWidthSmall ? 8 : 10
  }
})

export default styles
