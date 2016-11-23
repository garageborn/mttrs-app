import { StyleSheet, Dimensions, Platform } from 'react-native'

const triangle = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 7,
  borderRightWidth: 7,
  borderBottomWidth: 8,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  triangleContainer: {
    marginLeft: 15,
    zIndex: 2
  },
  outerTriangle: {
    ...triangle,
    borderBottomColor: '#DDDDDD'
  },
  innerTriangle: {
    ...triangle,
    marginTop: -6,
    borderBottomColor: '#F1F1F1'
  },
  box: {
    marginTop: -2,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  headlineContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center'
  },
  headline: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    paddingLeft: 5
  },
  summary: {
    color: '#666666',
    fontSize: 15,
    lineHeight: 23
  }
})

export default styles
