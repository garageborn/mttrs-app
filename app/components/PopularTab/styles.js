import { StyleSheet } from 'react-native'

const containerStyles = {
  paddingVertical: 15,
  paddingHorizontal: 20
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
    borderBottomWidth: 4,
    borderColor: '#FFF'
  },
  text: {
    ...textStyles,
    color: '#FFF'
  },
  activeText: {
    fontWeight: '600'
  }
})

export default styles
