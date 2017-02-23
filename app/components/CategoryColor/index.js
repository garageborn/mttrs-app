import React, { PropTypes } from 'react'
import { Animated, Easing } from 'react-native'
import styles, { activeHeight, inactiveHeight } from './styles'

class CategoryColor extends React.Component {
  constructor (props) {
    super(props)
    const initialHeight = props.isActive ? activeHeight : inactiveHeight
    this.state = {
      height: new Animated.Value(initialHeight)
    }
  }

  shouldComponentUpdate (nextProps) {
    return this.props.color !== nextProps.color || this.props.isActive !== nextProps.isActive
  }

  componentWillMount () {
    this.toggle(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.toggle(nextProps)
  }

  categoryColorStyles () {
    let { isActive, color } = this.props
    let defaultStyle = { backgroundColor: color, height: this.state.height }

    if (isActive) {
      return [styles.active, defaultStyle]
    } else {
      return [styles.inactive, defaultStyle]
    }
  }

  render () {
    return <Animated.View style={this.categoryColorStyles()} />
  }

  activate () {
    this.changeHeight(activeHeight, Easing.out(Easing.quad))
  }

  deactivate () {
    this.changeHeight(inactiveHeight, Easing.in(Easing.quad))
  }

  toggle (props) {
    props.isActive ? this.activate() : this.deactivate()
  }

  changeHeight (toValue, easing) {
    if (this.state.height === toValue) return

    Animated.timing(
      this.state.height, { duration: 200, easing, toValue }
    ).start()
  }
}

CategoryColor.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

export default CategoryColor
