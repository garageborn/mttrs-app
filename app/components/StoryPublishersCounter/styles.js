import { StyleSheet } from 'react-native'
const containerSize = 42
const borderWidth = 2
const innerContainer = {
  width: containerSize - borderWidth,
  height: (containerSize / 2) - borderWidth
}

const styles = StyleSheet.create({
  container: {
    height: containerSize,
    width: containerSize,
    borderRadius: containerSize,
    borderWidth,
    borderColor: '#E9E9E9',
    marginRight: 5
  },
  imageContainer: {
    ...innerContainer,
    borderTopLeftRadius: containerSize / 2,
    borderTopRightRadius: containerSize / 2
  },
  textContainer: {
    ...innerContainer,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: containerSize / 2,
    borderBottomRightRadius: containerSize / 2
  },
  text: {
    marginRight: 5,
    fontSize: 11,
    fontWeight: '500'
  }
})

export default styles
