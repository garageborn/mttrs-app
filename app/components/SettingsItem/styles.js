import { StyleSheet } from 'react-native'
export const regularTextColor = '#666766'
export const smallTextColor = '#999999'

const textContainer = {
  flexDirection: 'column'
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#DADADA'
  },
  leftContainer: {
    flexDirection: 'row'
  },
  textContainer: {
    ...textContainer
  },
  textContainerWithIcon: {
    ...textContainer,
    marginLeft: 10
  }
})

export default styles
