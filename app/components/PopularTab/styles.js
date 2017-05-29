import { StyleSheet } from 'react-native'

const containerStyles = {
  paddingVertical: 10,
  paddingHorizontal: 8
}

const textStyles = {
  fontSize: 14
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles
  },
  activeContainer: {
    ...containerStyles,
    borderBottomWidth: 2,
    borderColor: '#FFF'
  },
  text: {
    ...textStyles,
    color: '#FFF'
  },
  activeText: {
    fontWeight: '700'
  }
})

export default styles
