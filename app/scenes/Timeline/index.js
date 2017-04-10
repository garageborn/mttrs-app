import React, { Component, PropTypes } from 'react'
import { View, AppState, Platform } from 'react-native'
import { connect } from 'react-redux'
import AnalyticsContainer from '../../containers/AnalyticsContainer'
import TimelineHeaderContainer from '../../containers/TimelineHeaderContainer'
import CategoriesTimelineContainer from '../../containers/CategoriesTimelineContainer'
import PublisherTimeline from '../../containers/PublisherTimeline'
import StoryLinksContainer from '../../containers/StoryLinksContainer'
import MenuPanelContainer from '../../containers/MenuPanelContainer'
import { MenuActions } from '../../actions/index'
import { headerHeight } from '../../styles/Global'
import styles from '../../styles/App'
import { DARK_COLOR } from '../../constants/Colors'

class TimelineScene extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => {
        return <TimelineHeaderContainer params={route.params} />
      },
      renderLeft: () => null,
      renderRight: () => null,
      backgroundColor: DARK_COLOR,
      height: headerHeight
    }
  }

  constructor () {
    super()
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange (appState) {
    if (appState === 'active') return
    return this.props.dispatch(MenuActions.closeMenu())
  }

  render () {
    return (
      <View style={styles.container}>
        <AnalyticsContainer screen={this.analyticsScreen} />
        {this.renderTimeline()}
        <MenuPanelContainer params={this.props.route.params} />
        {this.renderStoryLinks()}
      </View>
    )
  }

  renderTimeline () {
    if (this.isPublisherSection) {
      return <PublisherTimeline model={this.currentSection.model} />
    } else if (this.isCategoriesSection) {
      return <CategoriesTimelineContainer params={this.props.route.params} />
    }
  }

  renderStoryLinks () {
    const { params } = this.props.route
    let section = params.section || {}
    let storyLinks = section.storyLinks || {}
    let publisherSlug = this.isPublisherSection ? params.section.model.slug : ''

    if (!storyLinks.open) return

    return <StoryLinksContainer story={storyLinks.story} publisherSlug={publisherSlug} />
  }

  get currentSection () {
    const { params } = this.props.route
    return params.section || {}
  }

  get isCategoriesSection () {
    if (!this.currentSection.name) return true
    return this.currentSection.name === 'home' || this.currentSection.name === 'category'
  }

  get isPublisherSection () {
    return this.currentSection.name === 'publisher'
  }

  get analyticsScreen () {
    if (!this.currentSection.name || this.currentSection.name === 'home') return '/home'
    return `/${this.currentSection.model.slug}`
  }
}

TimelineScene.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  section: PropTypes.object
}

const mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(TimelineScene)
