import React, { PropTypes } from 'react'
import { Animated } from 'react-native'
import styles from './styles'

class CategoryColor extends React.Component {
  constructor () {
    super()
    this.state = {
      height: new Animated.Value(3)
    }
  }

  handleAnimation (direction) {
    Animated.timing(
      this.state.height,
      {
        toValue: direction === 'up' ? 9 : 3,
        duration: 230
      }
    ).start()
  }

  categoryColorStyles () {
    let { isActive, color } = this.props
    const flexGrowValue = 1.075
    let categoryStyles = [styles.color, {backgroundColor: color, height: this.state.height}]
    if (isActive) {
      this.handleAnimation('up')
      return [...categoryStyles, { flexGrow: flexGrowValue }]
    }
    this.handleAnimation('down')
    return categoryStyles
  }

  render () {
    return (
      <Animated.View style={this.categoryColorStyles()} />
    )
  }
}

CategoryColor.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

export default CategoryColor
