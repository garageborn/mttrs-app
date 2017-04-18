import { StyleSheet, Platform, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const headlineOffset = 105

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },

  box: {
    position: 'relative',
    marginTop: 2,
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#F7F7F8',
  },

  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  headlineVisited: {
    opacity: 0.6
  },

  headline: {
    fontWeight: Platform.select({
      ios: '600',
      android: '500'
    }),
    fontSize: 13,
    lineHeight: 18,
    color: '#666766',
    marginTop: 3,
    marginBottom: 5
  },

  summary: {
    ...Platform.select({
      ios: {
        fontSize: 13,
        lineHeight: 22
      },
      android: {
        fontSize: 13,
        lineHeight: 22
      }
    }),
    color: '#666766',
    marginTop: 3
  },

  summaryVisited: {
    opacity: 0.6
  }
})

export default styles
