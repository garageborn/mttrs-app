import React, { Component, PropTypes } from 'react'
import { Animated, Easing, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Menu from '../components/Menu'

const { height } = Dimensions.get('window')

class MenuContainer extends Component {
  constructor () {
    super()

    this.state = {
      menuPositionY: new Animated.Value(-height)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.menuWillChange(nextProps)
  }

  menuWillChange (nextProps) {
    let currentMenu = this.props.uiReducer.menu
    let nextMenu = nextProps.uiReducer.menu
    let isOpenChanged = currentMenu.isOpen !== nextMenu.isOpen
    if (!isOpenChanged) return

    if (nextMenu.isOpen) {
      this.animate('in')
    } else {
      this.animate('out')
    }
  }

  animate (type) {
    let value, easing

    if (type === 'in') {
      value = 0
      easing = Easing.out(Easing.quad)
    } else {
      value = -height
      easing = Easing.in(Easing.quad)
    }

    return (
      Animated.timing(
        this.state.menuPositionY,
        {
          toValue: value,
          duration: 330,
          easing
        }
      )
    ).start()
  }

  render () {
    return (
      <Animated.View style={{transform: [{translateY: this.state.menuPositionY}]}}>
        <Menu params={this.props.params} />
      </Animated.View>
    )
  }
}

MenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  uiReducer: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

let mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(MenuContainer)
