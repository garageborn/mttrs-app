import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    paddingLeft: 10,
    paddingRight: 20,
    alignItems: 'center'
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 5
  },
  textContainer: {
    // marginLeft: 10
  },
  text: {
    color: 'rgba(0,0,0,0.54)',
    fontSize: 14
  },
  bold: {
    fontWeight: '700'
  }
})

export default styles
