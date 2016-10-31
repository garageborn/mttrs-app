import React, { Component, PropTypes } from 'react'
import { View, Animated, Dimensions, Easing } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from '@exponent/ex-navigation'
import { TimelineActions, MenuActions } from '../actions/index'
import Timeline from '../components/Timeline'
import StoryContainer from './StoryContainer'
import StoryLinksContainer from './StoryLinksContainer'
import Router from '../config/Router'
import styles from '../styles/App'
import MenuContainer from './MenuContainer'

const { height } = Dimensions.get('window')

class TimelineContainer extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)
    this.renderStory = this.renderStory.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.state = {
      menuPositionY: new Animated.Value(-height)
    }
  }

  componentDidMount() {
    this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    let nextSection = nextProps.params.section || {}
    let currentSection = this.props.params.section || {}

    let sectionNameChanged = nextSection.name !== currentSection.name
    let sectionModelChanged = nextSection.model !== currentSection.model
    if (sectionNameChanged || sectionModelChanged) this.fetchData(nextProps)
    if (nextProps.uiReducer.menu.isOpen) this.animate('in')
    if (nextProps.uiReducer.menu.retract) this.animate('out')
  }

  fetchData(props) {
    let action = TimelineActions.getTimeline(this.fetchQuery(props))
    return props.dispatch(action)
  }

  pullFetchData(props) {
    // let action = TimelineActions.pullToRefresh(this.fetchQuery(props))
    // return props.dispatch(action)
  }

  infiniteFetchData(props) {
    // let action = TimelineActions.infiniteToRefresh(this.fetchQuery(props))
    // return props.dispatch(action)
  }

  fetchQuery(props) {
    const { section } = props.params
    if (!section) return {}
    switch(section.name) {
      case 'category':
        return { category_slug: section.model.slug }
      case 'publisher':
        return { publisher_slug: section.model.slug }
    }
  }

  onPullToRefresh() {
    this.pullFetchData(this.props)
  }

  onEndReached() {
    this.infiniteFetchData(this.props)
  }

  animate(type) {
    let value, callback, easing = null
    if (type === 'in') {
      value = 0
      easing = Easing.out(Easing.quad)
    } else {
      value = -height
      callback = this.closeMenu
      easing = Easing.in(Easing.quad)
    }

    return (
      Animated.timing(
        this.state.menuPositionY,
        {
          toValue: value,
          duration: 330,
          easing: easing
        }
      ).start(callback)
    )
  }

  render() {
    console.log('render TimelineContainer')
    const { items, isFetching, isFetchingTop } = this.props
    return (
        <View style={styles.container}>
          {this.renderStoryLinks()}
          <Timeline
            items={items}
            isFetching={isFetching}
            isFetchingTop={isFetchingTop}
            onEndReached={this.onEndReached}
            onRefresh={this.onPullToRefresh}
            storyRenderer={this.renderStory}
            />
          <Animated.View style={{transform: [{translateY: this.state.menuPositionY}]}}>
            { this.renderMenu() }
          </Animated.View>
        </View>
    )
  }

  renderMenu() {
    const { params, uiReducer } = this.props
    if (uiReducer.menu.isOpen) return <MenuContainer params={params}/>
  }

  closeMenu() {
    this.props.dispatch(MenuActions.closeMenu())
  }

  renderStory(story) {
    return <StoryContainer story={story} section={this.props.params.section} />
  }

  renderStoryLinks() {
    const { params } = this.props
    let section = params.section || {}
    let storyLinks = section.storyLinks || {}
    if (!storyLinks.open) return
    return <StoryLinksContainer story={storyLinks.story}/>
  }
}

let mapStateToProps = (state) => {
  return {
    items: state.TimelineReducers.items,
    isFetching: state.TimelineReducers.isFetching,
    isFetchingTop: state.TimelineReducers.isFetchingTop,
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(TimelineContainer)
