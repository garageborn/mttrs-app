import React, { Component, PropTypes } from 'react'
import { ScrollView, View } from 'react-native'
import _isEqual from 'lodash/isEqual'

class ScrollableTabBar extends Component {
  constructor () {
    super()
    this.setScrollViewRef = this.setScrollViewRef.bind(this)
    this.scrollTo = this.scrollTo.bind(this)
    this.adjustScroll = this.adjustScroll.bind(this)
    this.state = { tabsLayout: [], tabBarWidth: 0 }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.index !== nextProps.index) this.scrollTo(nextProps.index)
  }

  shouldComponentUpdate (nextProps) {
    return this.props.index !== nextProps.index
  }

  componentDidMount () {
    const { subscribe } = this.props
    if (subscribe) this.positionListener = subscribe('position', this.adjustScroll)
  }

  componentWillUnmount () {
    if (this.positionListener) this.positionListener.remove()
  }

  render () {
    return (
      <ScrollView
        style={this.props.style}
        horizontal
        bounces={false}
        alwaysBounceHorizontal={false}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        overScrollMode='never'
        ref={this.setScrollViewRef}
        onLayout={(event) => this.updateTabBarWidth(event.nativeEvent.layout)}
      >
        {this.renderTabs()}
      </ScrollView>
    )
  }

  renderTabs () {
    const { renderTab, tabs, index } = this.props
    const activeIndex = index
    return tabs.map((tab, index) => {
      return (
        <View
          key={`tab_${index}`}
          ref={(el) => this.setTabRef(index, el)}
          onLayout={(event) => this.updateTabLayout(index, event.nativeEvent.layout)}
        >
          {renderTab(tab, index, activeIndex)}
        </View>
      )
    })
  }

  adjustScroll (position) {
    if (!this.scrollView) return
    const currentPositionIndex = Math.floor(position)
    const nextPositionIndex = Math.ceil(position)
    const currentPosition = this.getPositionFor(currentPositionIndex)
    const nextPosition = this.getPositionFor(nextPositionIndex)
    const percentageScrolled = position - currentPositionIndex
    const scrollDifference = nextPosition - currentPosition
    const finalPosition = this.normalizeScrollValue(
      Math.round(currentPosition + scrollDifference * percentageScrolled)
    )
    this.scrollView.scrollTo({ x: finalPosition, animated: false })
  }

  scrollTo (index) {
    if (!this.scrollView) return
    const position = this.getPositionFor(index)
    this.scrollView.scrollTo({ x: position, animated: true })
  }

  setScrollViewRef (el) {
    this.scrollView = el
  }

  setTabRef (index, el) {
    if (!el) return
    if (!this.tabsRef) this.tabsRef = []
    this.tabsRef[index] = el
  }

  updateTabLayout (index, { x, width }) {
    let tabsLayout = [...this.state.tabsLayout]
    const layout = {x, width}
    if (_isEqual(tabsLayout[index], layout)) return
    tabsLayout[index] = layout
    this.setState({ ...this.state, tabsLayout })
  }

  updateTabBarWidth ({ width }) {
    if (this.state.tabBarWidth === width) return
    this.setState({ ...this.state, tabBarWidth: width })
  }

  getPositionFor (index) {
    const tabLayout = this.state.tabsLayout[index]
    const tabCenter = tabLayout.x + tabLayout.width / 2
    const scrollCenter = this.state.tabBarWidth / 2
    return this.normalizeScrollValue(tabCenter - scrollCenter)
  }

  normalizeScrollValue (value) {
    const scrollWidth = this.state.tabsLayout.reduce((sum, item) => sum + item.width, 0)
    const maxPosition = scrollWidth - this.state.tabBarWidth
    return Math.max(Math.min(value, maxPosition), 0)
  }
}

ScrollableTabBar.propTypes = {
  styles: PropTypes.number,
  index: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  renderTab: PropTypes.func.isRequired,
  subscribe: PropTypes.func
}

export default ScrollableTabBar
