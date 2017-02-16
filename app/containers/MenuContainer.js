import React, { Component, PropTypes } from 'react'
import { Animated, Easing, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import BackButtonBehaviour from '../common/utils/BackButtonBehaviour'
import { MenuActions } from '../actions/index'
import Menu from '../components/Menu'

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

  closeMenu () {
    return Promise.resolve(this.props.dispatch(MenuActions.closeMenu()))
  }

  render () {
    const { isOpen } = this.props.uiReducer.menu

    return (
      <Animated.View style={{transform: [{translateY: this.state.menuPositionY}]}}>
        <BackButtonBehaviour isFocused={isOpen} onBackButtonPress={this.closeMenu} batata={'menu'}>
          <Menu params={this.props.params} />
        </BackButtonBehaviour>
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
