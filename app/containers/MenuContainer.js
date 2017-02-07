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

    isOpenChanged && nextMenu.isOpen && this.animate('in')
    retractChanged && nextMenu.retract && this.animate('out')
  }

  animate (type) {
    let value
    let callback
    let easing = null

    if (type === 'in') {
      value = 0
      easing = Easing.in(Easing.quad)
    } else {
      value = -height - headerHeight
      callback = this.closeMenu
      easing = Easing.out(Easing.quad)
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

  renderMenu () {
    const { params, uiReducer } = this.props
    if (uiReducer.menu.isOpen) return <Menu params={params} />
  }

  render () {
    const { menuPositionY } = this.state
    return (
      <Animated.View style={{transform: [{translateY: menuPositionY}]}}>
        {this.renderMenu()}
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
