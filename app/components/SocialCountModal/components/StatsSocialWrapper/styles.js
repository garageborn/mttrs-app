import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    borderColor: '#DADADA',
    borderBottomWidth: 1
  },
  firstRow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 40
  }
})

export default styles
