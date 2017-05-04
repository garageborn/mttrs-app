import { StyleSheet, Dimensions } from 'react-native'

export const bannerWidth = 320
export const bannerHeight = 300
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 2,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 2,
    elevation: 2,
    shadowOffset: {
      width: 3,
      height: 2
    },
    shadowColor: '#000',
    shadowOpacity: 0.2
  }
})

export default styles
