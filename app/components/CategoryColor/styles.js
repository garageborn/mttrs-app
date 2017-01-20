import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const numberOfCategories = 9

const styles = StyleSheet.create({
  color: {
    width: width / numberOfCategories,
    height: 2
  }
})

export default styles
