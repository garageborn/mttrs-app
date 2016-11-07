import React, { Component, PropTypes } from 'react'
import { View, Animated, Dimensions, Easing, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { MenuActions, NavigationActions } from '../actions/index'
import Timeline from '../components/Timeline'
import StoryContainer from './StoryContainer'
import StoryLinksContainer from './StoryLinksContainer'
import Router from '../config/Router'
import styles from '../styles/App'
import MenuContainer from './MenuContainer'

import _isNil from 'lodash/isNil'
import _isEmpty from 'lodash/isEmpty'

const { height } = Dimensions.get('window')

class TimelineContainer extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)
    this.renderStory = this.renderStory.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.renderScene = this.renderScene.bind(this)
    this.state = {
      menuPositionY: new Animated.Value(-height),
      navigationState: {
        index: 0,
        routes: [
         { key: '0', title: 'Top Stories', type: 'home', filter: 'home' }
        ]
      }
    }
  }

  handleChangeTab = (index) => {
    this.setState({
      navigationState: {
        index,
        routes: this.state.navigationState.routes
      }
    })
  }

  renderScene(props) {
    let { route } = props
    let routeType = !_isNil(route) ? route.type : 'publisher'
    let filter

    if (routeType === 'publisher') {
      filter = props.params.section.model.slug
    } else {
      filter = route.filter
    }

    console.log(filter)

    return (
      <Timeline
        onEndReached={this.onEndReached}
        onRefresh={this.onPullToRefresh}
        storyRenderer={this.renderStory}
        type={routeType}
        filter={filter}
      />
    )
  }

  componentWillReceiveProps(nextProps) {
    this.addSwipeRoutes(nextProps)
    this.sectionWillChange(nextProps)
    this.menuWillChange(nextProps)

  }

  sectionWillChange(nextProps) {
    let nextSection = nextProps.params.section || {}
    let currentSection = this.props.params.section || {}

    let sectionNameChanged = nextSection.name !== currentSection.name
    let sectionModelChanged = nextSection.model !== currentSection.model
    if (sectionNameChanged || sectionModelChanged) {
      this.changeSection(nextProps)
    }
  }

  menuWillChange(nextProps) {
    let currentMenu = this.props.uiReducer.menu || {}
    let nextMenu = nextProps.uiReducer.menu || {}

    let isOpenChanged = currentMenu.isOpen !== nextMenu.isOpen
    let retractChanged = currentMenu.retract !== nextMenu.retract

    if (isOpenChanged && nextMenu.isOpen) {
      this.animate('in')
    } else if(retractChanged && nextMenu.retract) {
      this.animate('out')
    }
  }

  changeSection(nextProps) {
    let { routes } = this.state.navigationState
    let nextIndex

    routes.find((route) => {
      if (route.type === 'home') return
      if (route.filter.slug === nextProps.params.section.model.slug) {
         nextIndex = JSON.parse(route.key)
      }
    })

    this.setState({
      ...this.state,
      navigationState: {
        ...this.state.navigationState,
        index: nextIndex
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    // const topStories = nextState.navigationState.index === 0 || _isNil(nextState.navigationState.index)
    // const newIndex = (nextState.navigationState.index !== this.state.navigationState.index)
    // const { dispatch } = this.props
    // if (!newIndex) return
    // if (!topStories) {
    //   const currentRoute = this.state.navigationState.routes[nextState.navigationState.index]
    //   dispatch(NavigationActions.selectCategory(currentRoute.category, 'slider'))
    // } else {
    //   dispatch(NavigationActions.home())
    // }
  }

  addSwipeRoutes(nextProps) {
    if (nextProps.data.loading || this.state.navigationState.routes.length > 1) return
    let newRoutes = nextProps.data.categories.map((item, idx) => {
      return { key: `${idx+1}`, title: item.name, type: 'category', filter: item }
    })
    this.setState({
      navigationState: {
        ...this.state.navigationState,
        routes: [...this.state.navigationState.routes, ...newRoutes ]
      }
    })
  }

  fetchQuery(props) {
    // const { section } = props.params
    // if (!section) return {}
    // switch(section.name) {
    //   case 'category':
    //     return { category_slug: section.model.slug }
    //   case 'publisher':
    //     return { publisher_slug: section.model.slug }
    // }
  }

  toggleLoading(nextProps) {
    this.setState(
      {
        navigationState: { ...this.state.navigationState }
      }
    )
  }

  pullFetchData(props) {
    // let action = TimelineActions.pullToRefresh(this.fetchQuery(props))
    // return props.dispatch(action)
  }

  infiniteFetchData(props) {
    // let action = TimelineActions.infiniteToRefresh(this.fetchQuery(props))
    // return props.dispatch(action)
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
    return (
      <View style={styles.container}>
        {this.renderStoryLinks()}
        {this.renderTimeline()}

        <Animated.View style={{transform: [{translateY: this.state.menuPositionY}]}}>
          {this.renderMenu()}
        </Animated.View>
      </View>
    )
  }

  renderTimeline() {
    const publisherTimeline = !_isNil(this.props.params.section) && this.props.params.section.name === 'publisher'
    if (publisherTimeline) {
      return this.renderScene(this.props)
    } else {
      return (
        <TabViewAnimated
          style={styles.listViewContainer}
          navigationState={this.state.navigationState}
          renderScene={this.renderScene}
          onRequestChangeTab={this.handleChangeTab}
          lazy={true}
        />
      )
    }
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
    uiReducer: state.uiReducer
  }
}

const Query = gql`query { categories(ordered: true) { id name slug } }`
const TimelineContainerWithData = graphql(Query)(TimelineContainer)
export default connect(mapStateToProps)(TimelineContainerWithData)
