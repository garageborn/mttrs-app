import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { injectIntl } from 'react-intl'
import ScrollableTabBar from '../ScrollableTabBar'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import PopularTab from '../PopularTab'
import Touchable from '../Touchable'
import styles from './styles'
import hexRgb from 'hex-rgb'

const topStoriesColor = '#FF5607'

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
    const renderOptions = {
      renderIndicator: true,
      indicatorStyle: styles.indicatorStyle,
      indicatorColors: this.indicatorColors
    }
    return (
      <View style={styles.container}>
        <ScrollableTabBar
          index={navigationState.index}
          tabs={navigationState.routes}
          subscribe={subscribe}
          renderTab={this.renderTab}
          renderOptions={renderOptions}
        />
        <View style={styles.buttonContainer}>
          <HeaderSettingsContainer />
        </View>
      </View>
    )
  }

  renderTab (tab, index) {
    const { jumpToIndex } = this.props
    return (
      <Touchable underlayColor={'rgba(0,0,0,.1)'} onPress={() => jumpToIndex(index)} >
        <View style={{paddingVertical: 1}}>
          <PopularTab content={this.tabContent(tab, index)} />
        </View>
      </Touchable>
    )
  }

  tabContent (tab, index) {
    const { categories, intl } = this.props
    if (index === 0) {
      return { name: intl.formatMessage({id: 'header.topStories'}), color: topStoriesColor }
    } else {
      return categories.find((category) => category.slug === tab.routeName)
    }
  }

  get indicatorColors () {
    const { categories } = this.props
    return [
      this.convertColor(topStoriesColor),
      ...categories.map((category) => this.convertColor(category.color))
    ]
  }

  convertColor (color) {
    const rgb = hexRgb(color)
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
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
