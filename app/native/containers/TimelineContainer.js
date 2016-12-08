import React, { Component, PropTypes } from 'react'
import { View, Animated, Dimensions, Easing, StyleSheet, Text, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { MenuActions, NavigationActions, StorageActions } from '../actions/index'
import Timeline from '../components/Timeline'
import Router from '../config/Router'
import styles from '../styles/App'
import { headerHeight } from '../styles/Header'
import MenuContainer from './MenuContainer'

import _isNil from 'lodash/isNil'
import _isEmpty from 'lodash/isEmpty'

const { height } = Dimensions.get('window')

const homeRoute = { key: '0', title: 'Top Stories', type: 'home', filter: 'home' }

class TimelineContainer extends Component {
  constructor(props) {
    super(props)
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')
    this.closeMenu = this.closeMenu.bind(this)
    this.renderScene = this.renderScene.bind(this)
    this.state = {
      menuPositionY: new Animated.Value(-height),
      navigationState: {
        index: 0,
        routes: [homeRoute]
      }
    }
  }

  componentWillMount() {
    this.props.dispatch(StorageActions.getFavoritePublishers())
    this.props.dispatch(StorageActions.getCurrentNamespace())
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
    let filter

    if (this.sceneType(props) === 'publisher') {
      filter = props.params.section.model
    } else {
      filter = props.route.filter
    }

    return (
      <Timeline
        storyRenderer={this.renderStory}
        type={this.sceneType(props)}
        filter={filter}
      />
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(NavigationActions.home())
  }

  componentWillUpdate(nextProps, nextState) {
    const home = nextState.navigationState.index === 0 || _isNil(nextState.navigationState.index)
    const newIndex = nextState.navigationState.index !== this.state.navigationState.index
    const { dispatch } = this.props
    if (!newIndex) return
    if (home) {
      dispatch(NavigationActions.home())
    } else {
      const currentRoute = this.state.navigationState.routes[nextState.navigationState.index]
      dispatch(NavigationActions.selectCategory(currentRoute.filter))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.namespaceWillChange(nextProps)) this.props.data.refetch()
    if (this.sectionType(nextProps) !== 'publisher') this.addSwipeRoutes(nextProps)
    if (this.categoriesWillChange(nextProps)) this.addSwipeRoutes(nextProps)
    this.menuWillChange(nextProps)
    this.sectionWillChange(nextProps)
  }

  namespaceWillChange(nextProps) {
    const willNamespaceLoad = nextProps.StorageReducer.namespace.isLoaded
    const willNamespaceChange = this.props.StorageReducer.namespace.name !== nextProps.StorageReducer.namespace.name
    return willNamespaceLoad && willNamespaceChange
  }

  categoriesWillChange(nextProps) {
    const hasCategories = !_isNil(this.props.data.categories)
    if (hasCategories) {
      const firstCategoryHasChanged = this.props.data.categories[0].slug !== nextProps.data.categories[0].slug
      const categoriesNumberHasChanged = this.props.data.categories.length !== nextProps.data.categories.length
      const categoriesChanged = firstCategoryHasChanged || categoriesNumberHasChanged
      return categoriesChanged
    }
  }

  sectionWillChange(nextProps) {
    let nextSection = nextProps.params.section || {}
    let currentSection = this.props.params.section || {}
    let sectionNameChanged = nextSection.name !== currentSection.name
    let sectionModelChanged = nextSection.model !== currentSection.model
    if (sectionNameChanged || sectionModelChanged) this.changeSection(nextProps)
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
    let nextIndex = 0

    if (this.sectionType(nextProps) === 'category') {
      let route = routes.find(route => route.filter.slug === nextProps.params.section.model.slug)
      nextIndex = parseInt(route.key)
    }

    this.setState({
      ...this.state,
      navigationState: {
        ...this.state.navigationState,
        index: nextIndex
      }
    })
  }

  addSwipeRoutes(nextProps) {
    const sameNavigationRoutes = nextProps.data.categories === this.props.data.categories
    const populatedRoutes = this.state.navigationState.routes.length > 1
    const hasRoutesAndWillBeTheSame = populatedRoutes && sameNavigationRoutes
    const isLoadingAndRoutesWillBeTheSame = nextProps.data.loading && sameNavigationRoutes
    if (hasRoutesAndWillBeTheSame || isLoadingAndRoutesWillBeTheSame) return
    const newRoutes = nextProps.data.categories.map((item, idx) => {
      return { key: `${idx + 1}`, title: item.name, type: 'category', filter: item }
    })
    this.setState({
      navigationState: {
        ...this.state.navigationState,
        routes: [homeRoute, ...newRoutes ]
      }
    })
  }

  animate(type) {
    let value, callback, easing = null
    if (type === 'in') {
      value = 0
      easing = Easing.in(Easing.quad)
    } else {
      value = -height - headerHeight
      callback = this.closeMenu
      easing = Easing.out(Easing.quad)
    }

    return (
      Animated.timing(
        this.state.menuPositionY,
        {
          toValue: value,
          duration: 330,
          easing
        }
      ).start(callback)
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTimeline()}
        <Animated.View style={{transform: [{translateY: this.state.menuPositionY}]}}>
          {this.renderMenu()}
        </Animated.View>
        {this.props.children}
      </View>
    )
  }

  renderTimeline() {
    if (this.sectionType(this.props) === 'publisher') {
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

  sectionType(props) {
    if (_isNil(props.params.section)) return 'home'
    return props.params.section.name
  }

  sceneType(props) {
    if (_isNil(props.route)) return 'publisher'
    return props.route.type
  }

  renderMenu() {
    const { params, uiReducer } = this.props
    if (uiReducer.menu.isOpen) return <MenuContainer params={params}/>
  }

  closeMenu() {
    this.props.dispatch(MenuActions.closeMenu())
  }

}

let mapStateToProps = (state) => {
  return {
    uiReducer: state.uiReducer,
    StorageReducer: state.StorageReducer
  }
}

const Query = gql`query { categories(ordered: true) { id name slug icon_id } }`
const TimelineContainerWithData = graphql(Query)(TimelineContainer)
export default connect(mapStateToProps)(TimelineContainerWithData)
