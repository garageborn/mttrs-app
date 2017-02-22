import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const activeHeight = 20
const defaultHeight = 3

class CategoryColor extends React.Component {
  constructor () {
    super()
    this.adjustScroll = this.adjustScroll.bind(this)
    this.state = {
      height: defaultHeight
    }
  }

  componentDidMount () {
    if (this.props.lastPosition === this.props.index) this.activate()
    this.positionListener = this.props.subscribe('position', this.adjustScroll)
  }

  componentWillUnmount () {
    this.positionListener.remove()
  }

  adjustScroll (position) {
    const { index } = this.props
    const isAnimating = position >= index - 1 && position <= index + 1
    const isTransitioning = !Number.isInteger(position)

    if (!isAnimating) return
    if (position === index) return this.activate()
    if (!isTransitioning) return this.deactivate()

    this.handleAnimation(this.getPercentage(position))
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.color !== nextProps.color || this.state.height !== nextState.height
  }

  handleAnimation (percentage) {
    const nextHeight = this.getNextHeight(percentage)
    if (this.state.height === nextHeight) return

    this.setState({ height: nextHeight })
  }

  render () {
    let style = [styles.color, { backgroundColor: this.props.color, height: this.state.height }]
    return <View style={style} />
  }

  deactivate () {
    this.handleAnimation(0)
  }

  activate () {
    this.handleAnimation(100)
  }

  getPercentage (position) {
    const { index } = this.props
    let positionDifference

    if (position <= index) {
      positionDifference = (1 - (index - position)) * 100
    } else {
      positionDifference = ((index + 1) - position) * 100
    }

    return Math.round(positionDifference)
  }

  getNextHeight (percentage) {
    const heightDifference = (activeHeight - defaultHeight) * (percentage / 100)
    return Math.round((defaultHeight + heightDifference) * 100) / 100
  }
}

CategoryColor.propTypes = {
  color: PropTypes.string.isRequired,
  lastPosition: PropTypes.number.isRequired,
  position: PropTypes.any.isRequired,
  subscribe: PropTypes.func.isRequired
}

export default CategoryColor
