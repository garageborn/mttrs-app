import React, { PropTypes } from 'react'
import { Animated } from 'react-native'
import styles from './styles'

class CategoryColor extends React.Component {
  constructor () {
    super()
    this.adjustScroll = this.adjustScroll.bind(this)
    this.state = {
      height: new Animated.Value(3)
    }
  }

  componentDidMount () {
    console.log(this.props)
    // if (this.props.index === 1) {
      this.positionListener = this.props.subscribe('position', this.adjustScroll)
    // }
  }

  componentWillUnmount () {
    this.positionListener.remove()
  }

  adjustScroll (position) {
    const { index } = this.props
    const isAnimating = position >= index - 1 && position < index + 1
    const isTransitioning = !Number.isInteger(position)
    // console.log('adjustScroll', { position, lastPosition: this.props.lastPosition, isAnimating, isTransitioning })

    // if (!isAnimating) return

    if (position === index) return this.handleAnimation('up')
    if (!isTransitioning) return this.handleAnimation('down')
  }

  shouldComponentUpdate (nextProps) {
    return this.props.color !== nextProps.color
  }

  handleAnimation (direction) {
    console.log('handleAnimation', direction)
    const nextHeight = direction === 'up' ? 9 : 3
    if (this.state.height === nextHeight) return

    Animated.timing(
      this.state.height, { toValue: nextHeight, duration: 230 }
    ).start()
  }

  categoryColorStyles () {
    let { isActive, color } = this.props
    // const flexGrowValue = 1.075
    let categoryStyles = [styles.color, {backgroundColor: color, height: this.state.height}]
    return categoryStyles
    // if (isActive) {
    //   this.handleAnimation('up')
    //   return [...categoryStyles, { flexGrow: flexGrowValue }]
    // } else {
    //   this.handleAnimation('down')
    //   return categoryStyles
    // }
  }

  render () {
    return <Animated.View style={this.categoryColorStyles()} />
  }
}

CategoryColor.propTypes = {
  color: PropTypes.string.isRequired,
  lastPosition: PropTypes.number.isRequired,
  position: PropTypes.any.isRequired,
  subscribe: PropTypes.func.isRequired
}

export default CategoryColor
