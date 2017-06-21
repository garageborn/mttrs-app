import { Dimensions, Platform, StyleSheet } from 'react-native'
const headerButtonsWidth = 140
const { width } = Dimensions.get('window')
const containerWidthBase = 1.30

const containerStyles = {
  flexGrow: 1,
  alignItems: 'center',
  flexDirection: 'row',
  marginLeft: Platform.select({
    android: 3,
    ios: 10
  }),
  width
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles
  },

  containerWithLeftButton: {
    ...containerStyles,
    width: width / containerWidthBase
  },

  titleContainer: {
    flexDirection: 'column'
  },

  text: {
    marginHorizontal: 5
  },

  titleWithSubtitle: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.8
  },

  subtitle: {
    fontSize: 12,
    color: '#FFF',
    width: width - headerButtonsWidth
  }
})

export default styles
