import React, { Component, PropTypes } from 'react'
import { Animated, Easing, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { AndroidBackButtonBehavior } from '@exponent/ex-navigation'

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
    let value
    let easing = null

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

  closeMenu () {
    return Promise.resolve(this.props.dispatch(MenuActions.closeMenu()))
  }

  renderMenu () {
    return (
      <Animated.View style={{transform: [{translateY: this.state.menuPositionY}]}}>
        <Menu params={this.props.params} />
      </Animated.View>
    )
  }

  render () {
    const { isOpen } = this.props.uiReducer.menu

    if (isOpen) {
      return (
        <AndroidBackButtonBehavior
          isFocused
          onBackButtonPress={this.closeMenu}
        >
          {this.renderMenu()}
        </AndroidBackButtonBehavior>
      )
    }

    return this.renderMenu()
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
