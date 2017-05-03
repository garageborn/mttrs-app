import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 120,
    alignItems: 'flex-end'
  },
  chart: {
    flexDirection: 'row'
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  labelText: {
    fontSize: 10,
    color: '#999999'
  },
  labelSeparator: {
    flexGrow: 1,
    borderColor: '#DADADA',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    margin: 3,
    height: 1
  }
})

export default styles
