import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TabViewAnimated } from 'react-native-tab-view'
import { NavigationActions } from '../../../actions/index'
import withQuery from './index.gql'
import HomeTimeline from '../HomeTimeline'
import CategoryTimeline from '../CategoryTimeline'
import ApolloError from '../../../components/ApolloError'
import styles from '../../../styles/App'

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

  componentWillReceiveProps (nextProps) {
    this.addSwipeRoutes(nextProps)
    this.sectionWillChange(nextProps)
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
    let nextRoute = routes.find(route => route.model.slug === nextProps.params.section.model.slug)
    let nextIndex = parseInt(nextRoute.key)

    if (nextIndex === this.state.navigationState.index) return

    this.setState({
      ...this.state,
      navigationState: {
        ...this.state.navigationState,
        index: nextIndex
      }
    })
  }

  addSwipeRoutes (nextProps) {
    if (!nextProps.data.categories || !nextProps.data.categories.length) return
    if (nextProps.data.loading || nextProps.data.error) return
    if (nextProps.data.categories === this.props.data.categories) return
    if (this.state.navigationState.routes.length > 1) return

    const newRoutes = nextProps.data.categories.map((category, idx) => {
      return { key: `${idx + 1}`, title: category.name, type: 'category', model: category }
    })

    this.setState({
      navigationState: {
        ...this.state.navigationState,
        routes: [homeRoute, ...newRoutes]
      }
    })
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
    const props = { model: sceneProps.route.model, navigationState: this.state.navigationState }

    if (sceneProps.route.type === 'home') {
      return <HomeTimeline {...props} />
    } else {
      return <CategoryTimeline {...props} />
    }
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
