import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    marginTop: 8,
    paddingTop: 8,
    marginBottom: 3,
    paddingBottom: 3
  },

  textLeft: {
    marginLeft: 14,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },

  textRight: {
    color: '#999999',
    fontSize: 12,
    marginRight: 10
  }
})

export default styles
