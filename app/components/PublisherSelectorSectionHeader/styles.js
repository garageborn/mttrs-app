import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 4,
    marginBottom: 3,
    paddingBottom: 3,
    backgroundColor: '#F7F7F8'
  },

  textLeftContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textLeft: {
    color: '#999999',
    fontSize: 18,
    marginLeft: 14,
    textAlign: 'center'
  },

  textRight: {
    color: '#999999',
    fontSize: 12,
    marginRight: 10
  }
})

export default styles
