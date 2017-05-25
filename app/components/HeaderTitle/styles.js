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
  text: {
    marginHorizontal: 5
  }
})

export default styles
