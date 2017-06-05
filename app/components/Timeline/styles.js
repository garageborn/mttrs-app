import { Dimensions, Platform, StyleSheet } from 'react-native'
import headerStyles from '../../styles/Header'
import tabBarBottomStyles from '../../styles/TabBarBottom'
import { height as favoritePublisherSelectorHeight } from '../FavoritePublisherSelector/styles'

const { width, height } = Dimensions.get('window')
const statusBarSize = Platform.select({
  ios: 0,
  android: 25
})

const containerStyles = {
  flexGrow: 1,
  height: height - headerStyles.headerStyle.height - tabBarBottomStyles.height - statusBarSize,
  width
}

console.log(favoritePublisherSelectorHeight)

debugger

const styles = StyleSheet.create({
  loading: {
    ...containerStyles,
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    ...containerStyles,
    backgroundColor: '#F7F7F8'
  },

  favoriteTimelineContainer: {
    flexGrow: containerStyles.flexGrow,
    height: containerStyles.height - favoritePublisherSelectorHeight,
    width: containerStyles.width
  },

  infiniteScrollLoadingContainer: {
    height: 50,
    padding: 10,
    marginBottom: 20
  },

  hideRefreshControl: {
    left: 20
  }
})

export default styles
