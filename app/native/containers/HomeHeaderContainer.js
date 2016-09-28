import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

class HomeHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <Header openMenu={this.toggleMenu} title='Top Stories' />
    )
  }

  toggleMenu() {
    const { dispatch, navigation, action } = this.props
    if (action === 'close') {
      dispatch(NavigationActions.pop(navigation.currentNavigatorUID))
    } else {
      let route = Router.getRoute('menu', { scene: 'home', tab: 'categories' })
      dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
    }
  }
}

HomeHeaderContainer.propTypes = {
  action: PropTypes.string
}

let mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(HomeHeaderContainer)
