import React, { Component, PropTypes } from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view'
import _isNil from 'lodash/isNil'
import { NavigationActions, StorageActions, AnalyticsActions, ErrorActions } from '../actions/index'
import MenuContainer from './MenuContainer'
import withQuery from './TimelineContainer.gql'
import Timeline from '../components/Timeline'
import styles from '../styles/App'

const homeRoute = { key: '0', title: 'Top Stories', type: 'home', filter: 'home' }

class TimelineContainer extends Component {
  constructor (props) {
    super(props)
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    this.renderScene = this.renderScene.bind(this)
    this.trackScreen = this.trackScreen.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.state = {
      navigationState: {
        index: 0,
        routes: [homeRoute]
      }
    }
  }

  componentWillMount () {
    this.props.dispatch(StorageActions.getFavoritePublishers())
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(NavigationActions.home())
  }

  componentWillUpdate (nextProps, nextState) {
    const willBePublisher = nextProps.params.section.name === 'publisher'
    const willBeHome = (nextState.navigationState.index === 0 || _isNil(nextState.navigationState.index))
    const newIndex = nextState.navigationState.index !== this.state.navigationState.index
    const currentRoute = this.state.navigationState.routes[nextState.navigationState.index]

    const { dispatch } = this.props

    if (!newIndex) return
    if (willBePublisher) return dispatch(NavigationActions.selectPublisher(nextProps.params.section.model))
    if (willBeHome) return dispatch(NavigationActions.home())
    return dispatch(NavigationActions.selectCategory(currentRoute.filter))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data.error) return this.props.dispatch((ErrorActions.showErrorDisclaimer()))
    if (this.tenantWillChange(nextProps)) this.props.data.refetch()
    if (this.sectionType(nextProps) !== 'publisher') this.addSwipeRoutes(nextProps)
    if (this.categoriesWillChange(nextProps)) this.addSwipeRoutes(nextProps)
    this.sectionWillChange(nextProps)
  }

  tenantWillChange (nextProps) {
    const willTenantLoad = nextProps.StorageReducer.tenant.isLoaded
    const willTenantChange = this.props.StorageReducer.tenant.name !== nextProps.StorageReducer.tenant.name
    return willTenantLoad && willTenantChange
  }

  categoriesWillChange (nextProps) {
    const hasCategories = !_isNil(this.props.data.categories)
    if (!hasCategories) return
    const firstCategoryHasChanged = this.props.data.categories[0].slug !== nextProps.data.categories[0].slug
    const categoriesNumberHasChanged = this.props.data.categories.length !== nextProps.data.categories.length
    const categoriesChanged = firstCategoryHasChanged || categoriesNumberHasChanged
    return categoriesChanged
  }

  sectionWillChange (nextProps) {
    let nextSection = nextProps.params.section || {}
    let currentSection = this.props.params.section || {}
    let sectionNameChanged = nextSection.name !== currentSection.name
    let sectionModelChanged = nextSection.model !== currentSection.model
    if (sectionNameChanged || sectionModelChanged) this.changeSection(nextProps)
  }

  changeSection (nextProps) {
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

  addSwipeRoutes (nextProps) {
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
        routes: [homeRoute, ...newRoutes]
      }
    })
  }

  sectionType (props) {
    if (_isNil(props.params.section)) return 'home'
    return props.params.section.name
  }

  sceneType (props) {
    if (_isNil(props.route)) return 'publisher'
    return props.route.type
  }

  trackScreen (screen) {
    this.props.dispatch(AnalyticsActions.trackScreen(screen))
  }

  handleChangeTab (index) {
    this.setState({
      navigationState: {
        index,
        routes: this.state.navigationState.routes
      }
    })
  }

  renderScene (props) {
    let filter

    if (this.sceneType(props) === 'publisher') {
      filter = props.params.section.model
    } else {
      filter = props.route.filter
    }
    return (
      <Timeline
        type={this.sceneType(props)}
        filter={filter}
        trackScreen={this.trackScreen}
        navigationState={this.state.navigationState}
      />
    )
  }

  renderTimeline () {
    if (this.sectionType(this.props) === 'publisher') {
      return this.renderScene(this.props)
    } else {
      return (
        <TabViewAnimated
          style={styles.listViewContainer}
          navigationState={this.state.navigationState}
          renderScene={this.renderScene}
          onRequestChangeTab={this.handleChangeTab}
          lazy
        />
      )
    }
  }

  render () {
    const { children, params } = this.props
    return (
      <View style={styles.container}>
        {this.renderTimeline()}
        <MenuContainer params={params} />
        {children}
      </View>
    )
  }
}

TimelineContainer.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  StorageReducer: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

let mapStateToProps = (state) => {
  return {
    uiReducer: state.uiReducer,
    StorageReducer: state.StorageReducer
  }
}

const TimelineContainerWithData = withQuery(TimelineContainer)
export default connect(mapStateToProps)(TimelineContainerWithData)
