import React, { Component, PropTypes } from 'react'
import { View, AppState, Platform } from 'react-native'
import { connect } from 'react-redux'
import TimelineHeaderContainer from '../../containers/TimelineHeaderContainer'
import CategoriesTimelineContainer from '../../containers/CategoriesTimelineContainer'
import PublisherTimeline from '../../containers/PublisherTimeline'
import StoryLinksContainer from '../../containers/StoryLinksContainer'
import SocialCountModalContainer from '../../containers/SocialCountModalContainer'
import MenuPanelContainer from '../../containers/MenuPanelContainer'
import { MenuActions } from '../../actions/index'
import { headerHeight } from '../../styles/Global'
import styles from '../../styles/App'
import { DARK_COLOR } from '../../constants/Colors'
import _result from 'lodash/result'

class MainScene extends Component {
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
      <View>
        <TimelineHeaderContainer params={this.props.navigation.state.params} />
        {this.renderTimeline()}
        {/* <MenuPanelContainer params={this.props.navigation.state.params} /> */}
        {this.renderStoryModal()}
      </View>
    )
  }

  renderTimeline () {
    if (this.isPublisherSection) {
      return <PublisherTimeline model={this.currentSection.model} />
    } else if (this.isCategoriesSection) {
      return <CategoriesTimelineContainer params={this.props.navigation.state.params} />
    }
  }

  renderStoryModal () {
    const { params } = this.props.navigation.state
    let section = _result(params, 'section', {})
    let modal = _result(section, 'modal', {})
    let publisherSlug = this.isPublisherSection ? params.section.model.slug : ''

    if (!modal.open) return

    const components = {
      storyLinks: StoryLinksContainer,
      socialCount: SocialCountModalContainer
    }

    const Component = components[modal.type]

    return <Component story={modal.story} publisherSlug={publisherSlug} />
  }

  get currentSection () {
    const { params } = this.props.navigation.state
    return _result(params, 'section', {})
  }

  get isCategoriesSection () {
    if (!this.currentSection.name) return true
    return this.currentSection.name === 'home' || this.currentSection.name === 'category'
  }

  get isPublisherSection () {
    return this.currentSection.name === 'publisher'
  }
}

MainScene.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.object
    }).isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  uiReducer: state.uiReducer
})

export default connect(mapStateToProps)(MainScene)
