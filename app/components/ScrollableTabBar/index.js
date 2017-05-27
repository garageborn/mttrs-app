import React, { Component, PropTypes } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import _result from 'lodash/result'
import _isEqual from 'lodash/isEqual'

class ScrollableTabBar extends Component {
  constructor () {
    super()
    this.setScrollViewRef = this.setScrollViewRef.bind(this)
    this.scrollToIndex = this.scrollToIndex.bind(this)
    this.scrollToPosition = this.scrollToPosition.bind(this)

    this.state = {
      tabsLayout: [],
      tabBarWidth: 0
    }

    this.indicatorAnimated = {
      x: new Animated.Value(0),
      width: new Animated.Value(0)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.index !== nextProps.index) this.scrollToIndex(nextProps.index)
  }

  shouldComponentUpdate (nextProps, nextState) {
    // const indexChanged = this.props.index !== nextProps.index
    // const tabsLayoutChanged = this.state.tabsLayout.length !== nextState.tabsLayout.length
    // console.log(tabsLayoutChanged)
    // return indexChanged || tabsLayoutChanged
    return this.props.index !== nextProps.index
  }

  componentDidMount () {
    const { index, subscribe } = this.props
    if (subscribe) this.positionListener = subscribe('position', this.scrollToPosition)
    this.scrollToIndex(index)
  }

  componentWillUnmount () {
    if (this.positionListener) this.positionListener.remove()
  }

  componentDidUpdate () {
    global.requestAnimationFrame(() => this.scrollToIndex(this.props.index))
  }

  render () {
    return (
      <ScrollView
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
        {this.renderIndicator()}
      </ScrollView>
    )
  }

  renderTabs () {
    const { renderTab, tabs } = this.props
    return tabs.map((tab, index) => {
      return (
        <View
          key={`tab_${index}`}
          ref={(el) => this.setTabRef(index, el)}
          onLayout={(event) => this.updateTabLayout(index, event.nativeEvent.layout)}
        >
          {renderTab(tab, index)}
        </View>
      )
    })
  }

  renderIndicator () {
    if (!_result(this.props, 'renderOptions.renderIndicator')) return null

    const style = { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'red', height: 10 }

    return (
      <Animated.View
        style={[style, { width: this.indicatorAnimated.width, left: this.indicatorAnimated.x }]}
      />
    )
  }

  scrollToPosition (position) {
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
    this.moveIndicatorToPosition(position)
  }

  scrollToIndex (index) {
    if (!this.scrollView) return
    const position = this.getPositionFor(index)
    this.scrollView.scrollTo({ x: position, animated: true })
    this.moveIndicatorToIndex(index)
  }

  moveIndicatorToPosition (position) {
    const currentPositionIndex = Math.floor(position)
    const nextPositionIndex = Math.ceil(position)
    const currentTabLayout = this.state.tabsLayout[currentPositionIndex]
    const nextTabLayout = this.state.tabsLayout[nextPositionIndex]
    const percentageScrolled = position - currentPositionIndex
    const scrollDifference = nextTabLayout.x - currentTabLayout.x
    const finalPosition = Math.round(currentTabLayout.x + scrollDifference * percentageScrolled)
    this.indicatorAnimated.x.setValue(finalPosition)
  }

  moveIndicatorToIndex (index) {
    const tabLayout = this.state.tabsLayout[index]
      console.log({index, tabLayout})
    if (!tabLayout) return
    Animated.parallel([
      Animated.spring(this.indicatorAnimated.x, {
        toValue: tabLayout.x,
        tension: 300,
        friction: 35
      }),
      Animated.spring(this.indicatorAnimated.width, {
        toValue: tabLayout.width,
        tension: 300,
        friction: 35
      })
    ]).start()
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
    const tabsLayout = [...this.state.tabsLayout]
    const layout = { x, width }
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
    if (!tabLayout) return
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
  index: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  renderTab: PropTypes.func.isRequired,
  subscribe: PropTypes.func,
  renderOptions: PropTypes.shape({
    renderIndicator: PropTypes.bool
  })
}

export default ScrollableTabBar
