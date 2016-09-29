import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'
import HomeHeaderContainer from './HomeHeaderContainer'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import PublisherHeaderContainer from './PublisherHeaderContainer'
import MenuContainer from './MenuContainer'

class TimelineHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    return (
      <View>
        { this.renderHeader() }
        { this.renderMenu() }
      </View>
    )
  }

  renderHeader() {
    return <HomeHeaderContainer toggleMenu={this.toggleMenu} />
  }

  renderMenu() {
    const { params } = this.props
    if (params.menu && params.menu.open) return <MenuContainer params={params}/>
  }

  toggleMenu() {
    const { dispatch, navigation, params } = this.props
    let menuParams = Object.assign({}, params.menu, { open: !this.isMenuOpened })
    let newParams = Object.assign({}, params, { menu: menuParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }

  get isMenuOpened() {
    return this.props.params.menu && this.props.params.menu.open
  }
}

TimelineHeaderContainer.propTypes = {
  params: PropTypes.object.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    navigation: state.navigation
  }
}

export default connect(mapStateToProps)(TimelineHeaderContainer)
