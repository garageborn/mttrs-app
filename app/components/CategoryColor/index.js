import React, { PropTypes } from 'react'
import { Dimensions, Animated } from 'react-native'
import styles from './styles'

const { width } = Dimensions.get('window')

class CategoryColor extends React.Component {
  constructor () {
    super()
    this.state = {
      h: new Animated.Value(2)
    }
  }

  componentWillMount () {
    if (!this.props.isActive) return
    this.handleAnimation()
  }

  handleAnimation (direction) {
    Animated.timing(
      this.state.h,
      {
        toValue: direction === 'up' ? 12 : 2,
        duration: 230
      }
    ).start()
  }

  getBorderWidth () {
    let currentSize = width
    let colorsShown = this.props.categoriesLength + 1
    while ((currentSize % colorsShown) !== 0) currentSize++
    return currentSize - width
  }

  categoryColorStyles () {
    let { isActive, color } = this.props
    let categoryStyles = [styles.color, {backgroundColor: color, height: this.state.h}]
    if (isActive) {
      this.handleAnimation('up')
      return [...categoryStyles, {borderRightWidth: this.getBorderWidth(), borderColor: color}]
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
  categoriesLength: PropTypes.number,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

export default CategoryColor
