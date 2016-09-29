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
        <HomeHeaderContainer toggleMenu={this.toggleMenu} />
        { this.renderMenu() }
      </View>
    )
  }

  renderMenu() {
    console.log('render menu', this.props.params)
    const { openMenu } = this.props.params
    if (openMenu) return <MenuContainer />
  }

  toggleMenu() {
    const { dispatch, navigation, params } = this.props
    let newParams = Object.assign({}, params, { openMenu: !params.openMenu })
    console.log('---------------', newParams)
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
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
