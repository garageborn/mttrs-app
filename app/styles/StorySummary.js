import { StyleSheet, Platform } from 'react-native'

const triangle = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 7,
  borderRightWidth: 7,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent'
}

const trianglePointingUp = {
  ...triangle,
  borderBottomWidth: 8
}

const expandButtonTriangle = {
  ...triangle,
  borderLeftWidth: 5,
  borderRightWidth: 5,
  marginTop: 7,
  marginRight: 3,
  borderColor: 'black'
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
    ...trianglePointingUp,
    borderBottomColor: '#DDDDDD'
  },
  innerTriangle: {
    ...trianglePointingUp,
    marginTop: -6,
    borderBottomColor: '#F1F1F1'
  },
  box: {
    position: 'relative',
    marginTop: -2,
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
  headline: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 3,
    marginLeft: 5
  },
  summary: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 3
  },
  summaryExpanded: {
    paddingBottom: 20
  },
  showLessTriangle: {
    ...expandButtonTriangle,
    borderBottomWidth: 5
  },
  showMoreTriangle: {
    ...expandButtonTriangle,
    borderTopWidth: 5
  },
  buttonTextContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: 'transparent'
  },
  expandButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  expandButtonContainer: {
    backgroundColor: '#F1F1F1'
  },
  footer: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    flexGrow: 1
  },
  gradient: {
    marginHorizontal: 1,
    height: 50,
    backgroundColor: 'transparent'
  }
})

export default styles
