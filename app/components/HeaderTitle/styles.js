import { StyleSheet } from 'react-native'

const containerStyles = {
  flexGrow: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles
  },
  publisherContainer: {
    ...containerStyles,
    alignSelf: 'flex-start'
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
    fontSize: 14,
    color: '#FFF'
  }
})

export default styles
