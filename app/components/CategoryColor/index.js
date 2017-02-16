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

  shouldComponentUpdate (nextProps) {
    return this.props.color !== nextProps.color || this.props.isActive !== nextProps.isActive
  }

  handleAnimation (direction) {
    const nextHeight = direction === 'up' ? 9 : 3
    if (this.state.height === nextHeight) return

    Animated.timing(
      this.state.height, { toValue: nextHeight, duration: 230 }
    ).start()
  }

  categoryColorStyles () {
    let { isActive, color } = this.props
    const flexGrowValue = 1.075
    let categoryStyles = [styles.color, {backgroundColor: color, height: this.state.height}]
    if (isActive) {
      this.handleAnimation('up')
      return [...categoryStyles, { flexGrow: flexGrowValue }]
    } else {
      this.handleAnimation('down')
      return categoryStyles
    }
  }

  render () {
    return <Animated.View style={this.categoryColorStyles()} />
  }
}

CategoryColor.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

export default CategoryColor
