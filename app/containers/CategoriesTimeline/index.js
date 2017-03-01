import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view'
import _isEqual from 'lodash/isEqual'
import { NavigationActions } from '../../actions/index'
import withQuery from './index.gql'
import HomeTimeline from '../HomeTimeline'
import CategoryTimeline from '../CategoryTimeline'
import ApolloError from '../../components/ApolloError'
import styles from '../../styles/App'

const homeRoute = { key: '0', title: 'Top Stories', type: 'home', model: { } }

class CategoriesTimeline extends Component {
  constructor (props) {
    super(props)
    this.renderScene = this.renderScene.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.state = {
      navigationState: {
        index: 0,
        routes: [homeRoute]
      }
    }
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.data.loading !== nextProps.data.loading) return true
    if (!_isEqual(this.props.params !== nextProps.params)) return true
    return !_isEqual(this.props.data.categories, nextProps.data.categories)
  }

  componentWillReceiveProps (nextProps) {
    this.addSwipeRoutes(nextProps)
  }

  componentWillUnmount () {
    if (this.tabChangeListener) this.tabChangeListener.remove()
  }

  addSwipeRoutes (nextProps) {
    if (nextProps.data.loading || nextProps.data.error) return

    const routes = this.getRoutes(nextProps)
    const activeRouteKey = this.getActiveRouteKey(nextProps, routes)

    this.setState({
      navigationState: {
        ...this.state.navigationState,
        routes: routes,
        index: activeRouteKey
      }
    })
  }

  getActiveRouteKey (props, routes) {
    if (!props.params.section || props.params.section.name === 'home') return 0
    const activeRoute = routes.find(route => route.model.slug === props.params.section.model.slug)
    return parseInt(activeRoute.key)
  }

  getRoutes (nextProps) {
    const hasSwipeRoutes = this.state.navigationState.routes.length > 1
    if (hasSwipeRoutes && _isEqual(this.props.data.categories, nextProps.data.categories)) {
      return this.state.navigationState.routes
    }
    const routes = nextProps.data.categories.map((category, idx) => {
      return { key: `${idx + 1}`, title: category.name, type: 'category', model: category }
    })

    return [homeRoute, ...routes]
  }

  handleChangeTab (index) {
    if (index === this.state.navigationState.index) return

    const willBeHome = index === 0
    const nextRoute = this.state.navigationState.routes[index]

    if (willBeHome) {
      this.props.dispatch(NavigationActions.home())
    } else {
      this.props.dispatch(NavigationActions.selectCategory(nextRoute.model))
    }
  }

  renderScene (sceneProps) {
    this.subscribeToTabChange(sceneProps.subscribe)
    const props = { model: sceneProps.route.model, navigationState: this.state.navigationState }

    if (sceneProps.route.type === 'home') {
      return <HomeTimeline {...props} />
    } else {
      return <CategoryTimeline {...props} />
    }
  }

  subscribeToTabChange (subscribe) {
    if (this.tabChangeListener) return
    this.tabChangeListener = subscribe('jump', this.handleChangeTab)
  }

  renderError () {
    return <ApolloError data={this.props.data} />
  }

  render () {
    if (this.props.data.error) return this.renderError()

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

CategoriesTimeline.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

const CategoriesTimelineWithData = withQuery(CategoriesTimeline)
export default connect()(CategoriesTimelineWithData)
