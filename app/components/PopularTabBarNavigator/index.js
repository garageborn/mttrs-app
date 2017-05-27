import React, { Component, PropTypes } from 'react'
import { Text } from 'react-native'
import ScrollableTabBar from '../ScrollableTabBar'
import Touchable from '../Touchable'

class PopularTabBarNavigator extends Component {
  constructor () {
    super()
    this.renderTab = this.renderTab.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.navigationState.index !== nextProps.navigationState.index
  }

  render () {
    const { navigationState, subscribe } = this.props

    return (
      <ScrollableTabBar
        index={navigationState.index}
        tabs={navigationState.routes}
        subscribe={subscribe}
        renderTab={this.renderTab}
        renderOptions={{ renderIndicator: true }}
      />
    )
  }

  renderTab (tab, index) {
    const { jumpToIndex } = this.props
    return (
      <Touchable onPress={() => jumpToIndex(index)} >
        <Text style={{padding: 20}}>{tab.key}</Text>
      </Touchable>
    )
  }
}

PopularTabBarNavigator.propTypes = {
  navigationState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired
  }).isRequired,
  jumpToIndex: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired
}

export default PopularTabBarNavigator
