import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

class CategoryHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.closeMenu = this.closeMenu.bind(this)
    this.openMenu = this.openMenu.bind(this)
  }

  render() {
    const { action } = this.props
    const { name } = this.props.currentCategory
    return (
      <Header
        openMenu={this.openMenu}
        closeMenu={this.closeMenu}
        action={action}
        title={name} />
    )
  }

  closeMenu() {
    const { dispatch, navigation } = this.props
    dispatch(NavigationActions.pop(navigation.currentNavigatorUID))
  }

  openMenu() {
    const { dispatch, navigation, action } = this.props
    let route = Router.getRoute('menu', { scene: 'category', tab: 'categories' })
    dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
  }
}

CategoryHeaderContainer.propTypes = {
  action: PropTypes.string
}

let mapStateToProps = (state) => {
  return {
    currentCategory: state.CurrentCategoryReducer.category,
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(CategoryHeaderContainer)
