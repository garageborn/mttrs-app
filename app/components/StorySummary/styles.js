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
    padding: 15,
    borderRadius: 3,
    backgroundColor: '#F1F1F1',
    borderColor: '#DDD',
    borderWidth: 1
  },

  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  icon: {
    marginRight: 5
  },

  headlineVisited: {
    opacity: 0.7
  },

  headline: {
    ...Platform.select({
      ios: {
        fontSize: 14,
        fontWeight: '600'
      },
      android: {
        fontSize: 12,
        fontWeight: '500'
      }
    }),
    width: width - headlineOffset,
    color: '#666666',
    marginTop: 3,
    marginLeft: 5,
    marginBottom: 5
  },

  summary: {
    ...Platform.select({
      ios: {
        fontSize: 14,
        lineHeight: 22
      },
      android: {
        fontSize: 12,
        lineHeight: 20
      }
    }),
    color: '#666666',
    marginTop: 3
  },

  summaryVisited: {
    opacity: 0.5
  }
})

export default styles
