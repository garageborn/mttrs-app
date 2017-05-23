import { StyleSheet, Dimensions, Platform } from 'react-native'
import { headerHeight } from './Global'
const { width, height } = Dimensions.get('window')
const tagsHeight = 55
const headerWithTagsHeight = headerHeight + tagsHeight

const containerStyles = {
  flexGrow: 1,
  height: height - headerHeight,
  width
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles,
    backgroundColor: '#F1F1F1',
    paddingBottom: 15
  },

  loadingText: {
    color: '#999999'
  },

  listViewContainer: {
    // position: 'absolute',
    // top: Platform.select({
    //   ios: 5,
    //   android: 0
    // }),
    ...containerStyles
  },

  listViewWithTags: {
    height: height - headerWithTagsHeight,
    top: tagsHeight
  }
})

export default styles
