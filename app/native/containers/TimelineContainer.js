import React, { Component, PropTypes } from 'react'
import { View, Animated, Dimensions, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view'
import { MenuActions, CategoryActions, NavigationActions, TimelineActions } from '../actions/index'
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
      menuPositionY: new Animated.Value(-height),
      navigationState: {
        index: 0,
        routes: [
         { key: '0', title: 'Top Stories' }
        ],
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

  renderScene = () => {
    const { items, isFetching, isFetchingTop } = this.props
    return (
      <Timeline
        items={items}
        isFetching={isFetching}
        isFetchingTop={isFetchingTop}
        onEndReached={this.onEndReached}
        onRefresh={this.onPullToRefresh}
        storyRenderer={this.renderStory}
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
    if (sectionNameChanged || sectionModelChanged) {
      this.fetchData(nextProps)
    }
    if (categories.length < nextProps.categories.length) {
      this.addSwipeRoutes(nextProps)
    }
    if (nextProps.uiReducer.menu.isOpen) this.animate('in')
    if (nextProps.uiReducer.menu.retract) this.animate('out')
  }

  componentWillUpdate(nextProps, nextState) {
    const topStories = nextState.navigationState.index === 0
    const newIndex = (nextState.navigationState.index !== this.state.navigationState.index)
    const { dispatch } = this.props
    if (newIndex && !topStories) {
      const currentRoute = this.state.navigationState.routes[nextState.navigationState.index]
      dispatch(NavigationActions.selectCategory(currentRoute.category))
    }

    if (newIndex && topStories) dispatch(NavigationActions.home())
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
      default:
        return null
    }
  }

  pullFetchData(props) {
    let action = TimelineActions.pullToRefresh(this.fetchQuery(props))
    return props.dispatch(action)
  }

  infiniteFetchData(props) {
    let action = TimelineActions.infiniteToRefresh(this.fetchQuery(props))
    return props.dispatch(action)
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
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state.navigationState}
          renderScene={this.renderScene}
          onRequestChangeTab={this.handleChangeTab}
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
    categories: state.CategoriesReducers.categories,
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(TimelineContainer)
