import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view'
import _isEqual from 'lodash/isEqual'
import _result from 'lodash/result'
import _isEmpty from 'lodash/isEmpty'
import { injectIntl, defineMessages } from 'react-intl'
import { NavigationActions } from '../../actions/index'
import withQuery from './index.gql'
import HomeTimeline from '../HomeTimeline'
import CategoryTimeline from '../CategoryTimeline'
import ApolloError from '../../components/ApolloError'
import styles from '../../styles/App'

const messages = defineMessages({
  topStories: { id: 'header.topStories' }
})

class CategoriesTimeline extends Component {
  constructor (props) {
    super(props)

    this.renderScene = this.renderScene.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)

    this.state = {
      navigationState: {
        index: 0,
        routes: [this.homeRoute]
      },
      swiperStyles: null
    }
  }

  componentWillMount () {
    if (_isEmpty(this.props.params)) {
      this.props.dispatch(NavigationActions.home())
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.activeTag !== nextState.activeTag) return true
    if (this.props.data.loading !== nextProps.data.loading) return true
    if (!_isEqual(this.props.params !== nextProps.params)) return true
    return !_isEqual(this.props.data.categories, nextProps.data.categories)
  }

  componentWillReceiveProps (nextProps) {
    this.addSwipeRoutes(nextProps)
    // this.setSwiperStyles(nextProps)
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
    const { section } = props.params
    if (!_result(section, 'model')) return this.state.navigationState.index
    const activeRoute = routes.find(route => route.model.slug === section.model.slug)
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

    return [this.homeRoute, ...routes]
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
      return <CategoryTimeline {...props} activeTag={this.props.activeTag} />
    }
  }

  subscribeToTabChange (subscribe) {
    if (this.tabChangeListener) return
    this.tabChangeListener = subscribe('jump', this.handleChangeTab)
  }

  renderError () {
    return <ApolloError data={this.props.data} />
  }

  get swiperStyles () {
    const category = this.state.navigationState.index - 1
    let containerStyles = styles.listViewContainer
    if (!this.props.params.section || this.props.data.loading) return containerStyles
    const home = this.props.params.section.name === 'home'
    if (!home && this.props.data.categories[category].tags_count) return [styles.listViewContainer, styles.listViewWithTags]
    return containerStyles
  }

  render () {
    if (this.props.data.error) return this.renderError()
    return (
      <TabViewAnimated
        style={this.swiperStyles}
        navigationState={this.state.navigationState}
        renderScene={this.renderScene}
        onRequestChangeTab={this.handleChangeTab}
        lazy
      />
    )
  }

  get homeRoute () {
    let title = this.props.intl.formatMessage(messages.topStories)
    return { key: '0', title: title, type: 'home', model: { } }
  }
}

CategoriesTimeline.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired,
  activeTag: PropTypes.string
}

const IntlCategoriesTimeline = injectIntl(CategoriesTimeline)
const CategoriesTimelineWithData = withQuery(IntlCategoriesTimeline)
export default connect()(CategoriesTimelineWithData)
