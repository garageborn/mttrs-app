import React, { Component, PropTypes } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import _result from 'lodash/result'
import _isEqual from 'lodash/isEqual'

class ScrollableTabBar extends Component {
  constructor (props) {
    super(props)
    this.setScrollViewRef = this.setScrollViewRef.bind(this)
    this.scrollToIndex = this.scrollToIndex.bind(this)
    this.scrollToPosition = this.scrollToPosition.bind(this)

    this.tabsLayout = []
    this.tabBarWidth = 0
    this.currentIndex = props.index
    this.currentDraggingPosition = this.getPositionFor(props.index)
    this.indicatorAnimated = {
      x: new Animated.Value(this.currentDraggingPosition),
      width: new Animated.Value(0),
      color: new Animated.Value(0)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.index !== nextProps.index) {
      this.scrollToIndex(nextProps.index)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.index !== nextProps.index
  }

  componentDidMount () {
    const { subscribe } = this.props
    if (subscribe) this.positionListener = subscribe('position', this.scrollToPosition)
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
        scrollEventThrottle={16}
        onScrollBeginDrag={() => console.log(handleBeginDrag) }
        onScrollEndDrag={() => console.log(handleEndDrag) }
        onMomentumScrollBegin={() => console.log('_handleMomentumScrollBegin')}
        onMomentumScrollEnd={() => console.log('_handleMomentumScrollEnd')}
        onScroll={() => console.log('_handleScroll') }
        onLayout={(event) => this.updateTabBarWidth(event.nativeEvent.layout)}
      >
        {this.renderTabs()}
        {this.renderIndicator()}
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

  renderIndicator () {
    if (!_result(this.props, 'renderOptions.renderIndicator')) return null

    const indicatorStyle = _result(this.props, 'renderOptions.indicatorStyle') || {}
    const indicatorColors = _result(this.props, 'renderOptions.indicatorColors')

    const style = {
      position: 'absolute',
      left: 0,
      bottom: 1,
      height: 10,
      width: this.indicatorAnimated.width,
      transform: [{ translateX: this.indicatorAnimated.x }]
    }

    if (indicatorColors) {
      style.backgroundColor = this.indicatorAnimated.color.interpolate({
        inputRange: indicatorColors.map((color, index) => index),
        outputRange: indicatorColors
      })
    }

    return <Animated.View style={[style, indicatorStyle]} />
  }

  scrollToPosition (position) {
    if (!this.scrollView) return

    this.setDraggingPosition(position)
    const currentPositionIndex = this.getCurrentPositionIndex(position)
    const nextPositionIndex = this.getNextPositionIndex(position)

    if (this.currentIndex === nextPositionIndex) return
    if (Math.abs(this.currentIndex - position) >= 1) return

    const currentPosition = this.getPositionFor(currentPositionIndex)
    const nextPosition = this.getPositionFor(nextPositionIndex)
    const percentageScrolled = position - currentPositionIndex
    const scrollDifference = this.getScrollDifferente(currentPosition, nextPosition)

    const finalPosition = this.normalizeScrollValue(
      Math.round(currentPosition + scrollDifference * percentageScrolled)
    )
    this.scrollView.scrollTo({ x: finalPosition, animated: false })
    this.moveIndicatorToPosition(position)
  }

  scrollToIndex (index) {
    this.currentIndex = index
    if (!this.scrollView) return
    const position = this.getPositionFor(index)
    this.scrollView.scrollTo({ x: position, animated: true })
    this.moveIndicatorToIndex(index)
  }

  moveIndicatorToPosition (position) {
    const currentPositionIndex = this.getCurrentPositionIndex(position)
    const nextPositionIndex = this.getNextPositionIndex(position)
    const currentTabLayout = this.tabsLayout[currentPositionIndex]
    const nextTabLayout = this.tabsLayout[nextPositionIndex]
    const percentageScrolled = position - currentPositionIndex
    const scrollDifference = this.getScrollDifferente(currentTabLayout.x, nextTabLayout.x)
    const widthDifference = this.getScrollDifferente(currentTabLayout.width, nextTabLayout.width)

    const finalPosition = Math.round(currentTabLayout.x + scrollDifference * percentageScrolled)
    let finalWidth
    if (currentTabLayout.width > nextTabLayout.width) {
      finalWidth = currentTabLayout.width - widthDifference * Math.abs(percentageScrolled)
    } else {
      finalWidth = currentTabLayout.width + widthDifference * Math.abs(percentageScrolled)
    }

    this.indicatorAnimated.x.setValue(finalPosition)
    this.indicatorAnimated.width.setValue(finalWidth)
    this.indicatorAnimated.color.setValue(position)
  }

  moveIndicatorToIndex (index) {
    const tabLayout = this.tabsLayout[index]
    if (!tabLayout) return

    this.indicatorAnimated.x.setValue(tabLayout.x)
    this.indicatorAnimated.width.setValue(tabLayout.width)
    this.indicatorAnimated.color.setValue(index)
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
    const layout = { x, width }
    if (_isEqual(this.tabsLayout[index], layout)) return
    this.tabsLayout[index] = layout
    if (this.tabsLayout.length === this.props.tabs.length) this.scrollToIndex(this.props.index)
  }

  updateTabBarWidth ({ width }) {
    this.tabBarWidth = width
  }

  getPositionFor (index) {
    const tabLayout = this.tabsLayout[index]
    if (!tabLayout || !this.tabBarWidth) return 0
    const tabCenter = tabLayout.x + tabLayout.width / 2
    const scrollCenter = this.tabBarWidth / 2
    return this.normalizeScrollValue(tabCenter - scrollCenter)
  }

  normalizeScrollValue (value) {
    const scrollWidth = this.tabsLayout.reduce((sum, item) => sum + item.width, 0)
    const maxPosition = Math.max(scrollWidth - this.tabBarWidth, 0)
    return Math.max(Math.min(value, maxPosition), 0)
  }

  setDraggingPosition (position) {
    this.draggingDirection = this.currentPosition < position ? 'left' : 'right'
    this.currentPosition = position
  }

  getCurrentPositionIndex (position) {
    return this.draggingDirection === 'left' ? Math.floor(position) : Math.ceil(position)
  }

  getNextPositionIndex (position) {
    return this.draggingDirection === 'left' ? Math.ceil(position) : Math.floor(position)
  }

  getScrollDifferente (currentPosition, nextPosition) {
    return Math.max(nextPosition, currentPosition) - Math.min(nextPosition, currentPosition)
  }
}

ScrollableTabBar.propTypes = {
  styles: PropTypes.number,
  index: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  renderTab: PropTypes.func.isRequired,
  subscribe: PropTypes.func,
  renderOptions: PropTypes.shape({
    renderIndicator: PropTypes.bool,
    indicatorStyle: PropTypes.number
  })
}

export default ScrollableTabBar
