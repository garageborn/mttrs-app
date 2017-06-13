import { StyleSheet, Platform, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    margin: 10
  },

  box: {
    position: 'relative',
    marginTop: 2,
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#F7F7F8'
  },

  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  headline: {
    fontWeight: Platform.select({
      ios: '600',
      android: '500'
    }),
    fontSize: 14,
    lineHeight: 18,
    color: '#666766',
    marginTop: 3,
    marginBottom: 5
  },

  summary: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666766',
    marginTop: 3
  }
})

export default styles
