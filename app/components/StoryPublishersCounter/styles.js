import { StyleSheet } from 'react-native'
const containerSize = 42
const borderWidth = 2
const innerContainer = {
  width: containerSize - (borderWidth * 2),
  height: (containerSize / 2) - borderWidth,
  alignItems: 'center',
  justifyContent: 'center'
}

const styles = StyleSheet.create({
  container: {
    height: containerSize,
    width: containerSize,
    borderRadius: containerSize,
    borderWidth,
    borderColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    ...innerContainer,
    borderTopLeftRadius: containerSize / 2,
    borderTopRightRadius: containerSize / 2
  },
  textContainer: {
    ...innerContainer,
    backgroundColor: '#F1F1F1',
    borderBottomLeftRadius: containerSize / 2,
    borderBottomRightRadius: containerSize / 2
  },
  text: {
    marginRight: 3,
    fontSize: 11,
    fontWeight: '500'
  }
})

export default styles
