import React, { Component, PropTypes } from 'react'
import { Animated, Easing, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { MenuActions } from '../actions/index'
import Menu from '../components/Menu'
import { headerHeight } from '../styles/Global'

const { height } = Dimensions.get('window')

class MenuContainer extends Component {
  constructor () {
    super()

    this.state = {
      menuPositionY: new Animated.Value(-height)
    }

    this.closeMenu = this.closeMenu.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.menuWillChange(nextProps)
  }

  menuWillChange (nextProps) {
    let currentMenu = this.props.uiReducer.menu || {}
    let nextMenu = nextProps.uiReducer.menu || {}
    let isOpenChanged = currentMenu.isOpen !== nextMenu.isOpen
    let retractChanged = currentMenu.retract !== nextMenu.retract

    if (isOpenChanged && nextMenu.isOpen) {
      this.animate('in')
    } else if (retractChanged && nextMenu.retract) {
      this.animate('out')
    }
  }

  animate (type) {
    let value
    let callback
    let easing = null

    if (type === 'in') {
      value = 0
      easing = Easing.out(Easing.quad)
    } else {
      value = -height
      callback = this.closeMenu
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
      ).start(callback)
    )
  }

  closeMenu () {
    this.props.dispatch(MenuActions.closeMenu())
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
