import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { injectIntl } from 'react-intl'
import ScrollableTabBar from '../ScrollableTabBar'
import PopularTab from '../PopularTab'
import Touchable from '../Touchable'
import styles from './styles'

class PopularTabBarNavigator extends Component {
  constructor () {
    super()
    this.renderTab = this.renderTab.bind(this)
  }

  render () {
    const { navigationState, subscribe } = this.props
    return (
      <ScrollableTabBar
        style={styles.container}
        index={navigationState.index}
        tabs={navigationState.routes}
        subscribe={subscribe}
        renderTab={this.renderTab}
      />
    )
  }

  renderTab (tab, index, activeIndex) {
    const { jumpToIndex } = this.props
    const active = index === activeIndex
    return (
      <Touchable underlayColor={'rgba(0,0,0,.1)'} onPress={() => jumpToIndex(index)} >
        <View style={{paddingVertical: 1}}>
          <PopularTab
            active={active}
            content={this.tabContent(tab, index)}
          />
        </View>
      </Touchable>
    )
  }

  tabContent (tab, index) {
    const { categories, navigationState, intl } = this.props
    if (index === 0) return { name: intl.formatMessage({id: 'header.topStories'}), color: '#FFF' }
    if (index === navigationState.routes.length - 1) return { name: intl.formatMessage({id: 'header.publishers'}), color: '#999' }
    return categories.find((category) => category.slug === tab.routeName)
  }
}

PopularTabBarNavigator.propTypes = {
  categories: PropTypes.array.isRequired,
  navigationState: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired
  }).isRequired,
  jumpToIndex: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired
}

export default injectIntl(PopularTabBarNavigator)
