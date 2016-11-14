import { StyleSheet } from 'react-native'
const marginHorizonal = 15
const width = 24

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  right: {
    marginRight: marginHorizonal,
    padding: 20,
    width
  },

  left: {
    marginLeft: marginHorizonal,
    width
  }
})

export default styles
