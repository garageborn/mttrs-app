import { StyleSheet, Dimensions } from 'react-native'
import { mainComponentHeight as iosHeight } from '../MenuIOS/styles'
import { topStoriesHeight } from '../TopStoriesCategory/styles'

const { width } = Dimensions.get('window')
const iphoneWidthSmall = 320

const styles = StyleSheet.create({
  container: {
    height: iosHeight - topStoriesHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginBottom: width === iphoneWidthSmall ? 8 : 10
  }
})

export default styles
