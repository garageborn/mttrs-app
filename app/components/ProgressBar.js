import React, { PropTypes } from 'react'
import { View, Animated } from 'react-native'

const ProgressBar = ({ progress, height, color }) => {
  return <Animated.View style={{width: progress, height, backgroundColor: color}} />
}

ProgressBar.propTypes = {
  progress: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]).isRequired,
  height: PropTypes.number,
  color: PropTypes.string
}

ProgressBar.defaultProps = {
  height: 3,
  color: '#08C'
}

export default ProgressBar
