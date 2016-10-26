import React, { Component, PropTypes } from 'react'
import { View, Animated, Dimensions, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view'
import { MenuActions, CategoryActions, NavigationActions, TimelineActions } from '../actions/index'
import { TabViewAnimated } from 'react-native-tab-view';
import Timeline from '../components/Timeline'
import StoryContainer from './StoryContainer'
import StoryLinksContainer from './StoryLinksContainer'
import Router from '../config/Router'
import styles from '../styles/App'
import MenuContainer from './MenuContainer'
import _isNil from 'lodash/isNil'
import _isEmpty from 'lodash/isEmpty'

const { height } = Dimensions.get('window')

const tabViewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class TimelineContainer extends Component {
  static fetchData({ dispatch }) {
    return dispatch(CategoryActions.getCategories())
  }

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
         { key: '0', title: 'Top Stories' }
        ],
        loaded: false
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

  renderScene() {
    const { items, isFetching, isFetchingTop } = this.props

    return (
      <Timeline
        items={items}
        isFetching={!this.state.loaded}
        isFetchingTop={isFetchingTop}
        onEndReached={this.onEndReached}
        onRefresh={this.onPullToRefresh}
        storyRenderer={this.renderStory}
        navigationState={this.state.navigationState}
      />
    )
  }

  componentDidMount() {
    this.fetchCategories(this.props)
    this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const { categories } = this.props
    let nextSection = nextProps.params.section || {}
    let currentSection = this.props.params.section || {}

    let sectionNameChanged = nextSection.name !== currentSection.name
    let sectionModelChanged = nextSection.model !== currentSection.model
    const fetchingChanged = nextProps.isFetching !== this.props.isFetching

    if (fetchingChanged) this.toggleLoading(nextProps)
    if (sectionNameChanged || sectionModelChanged) this.fetchData(nextProps)
    if (categories.length < nextProps.categories.length) this.addSwipeRoutes(nextProps)
    if (nextProps.uiReducer.menu.isOpen) this.animate('in')
    if (nextProps.uiReducer.menu.retract) this.animate('out')
  }

  componentWillUpdate(nextProps, nextState) {
    const topStories = nextState.navigationState.index === 0 || _isNil(nextState.navigationState.index)
    const newIndex = (nextState.navigationState.index !== this.state.navigationState.index)
    const { dispatch } = this.props
    if (!newIndex) return
    if (!topStories) {
      const currentRoute = this.state.navigationState.routes[nextState.navigationState.index]
      dispatch(NavigationActions.selectCategory(currentRoute.category))
    } else {
      dispatch(NavigationActions.home())
    }
  }

  fetchCategories(props) {
    return props.dispatch(CategoryActions.getCategories())
  }

  addSwipeRoutes(nextProps) {
    let newRoutes = nextProps.categories.map((item, idx) => {
      return { key: `${idx+1}`, title: item.name, type: 'category', category: item }
    })
    this.setState({
      navigationState: {
        ...this.state.navigationState,
        routes: [...this.state.navigationState.routes, ...newRoutes ]
      }
    })
  }

  fetchData(props) {
    let action = TimelineActions.getTimeline(this.fetchQuery(props))
    props.dispatch(action)
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

  toggleLoading(nextProps) {
    this.setState(
      {
        navigationState: {
          ...this.state.navigationState,
          loaded: !nextProps.isFetching
        }
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
    const value = type === 'in' ? 0 : -height
    const callback = type === 'out' ? this.closeMenu : null
    return (
      Animated.timing(
        this.state.menuPositionY,
        {
          toValue: value,
          duration: 330
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
      return this.renderScene()
    } else {
      return (
        <TabViewAnimated
          style={styles.container}
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
    items: state.TimelineReducers.items,
    isFetching: state.TimelineReducers.isFetching,
    isFetchingTop: state.TimelineReducers.isFetchingTop,
    categories: state.CategoriesReducers.categories,
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(TimelineContainer)
