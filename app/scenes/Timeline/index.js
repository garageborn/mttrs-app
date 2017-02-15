import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TimelineHeaderContainer from '../../containers/TimelineHeaderContainer'
import CategoriesTimeline from '../../containers/CategoriesTimeline'
import PublisherTimeline from '../../containers/Timeline/Publisher'
import StoryLinksContainer from '../../containers/StoryLinksContainer'
import MenuContainer from '../../containers/MenuContainer'
import { headerHeight } from '../../styles/Global'
import { DARK_COLOR } from '../../constants/Colors'
import { BackAndroid, Platform } from 'react-native'
import { NavigationActions, MenuActions } from '../../actions/index'

class TimelineScene extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => <TimelineHeaderContainer params={route.params} />,
      renderLeft: () => null,
      renderRight: () => null,
      backgroundColor: DARK_COLOR,
      height: headerHeight,
      elevation: 0
    }
  }

  componentWillMount () {
    if (Platform.OS === 'android') this.listenToBackAndroid()
  }

  componentWillUnmount () {
    if (Platform.OS === 'android') this.unlistenToBackAndroid()
  }

  listenToBackAndroid () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.uiReducer.menu.isOpen) return this.retractMenu()
      if (this.isHomeSection) return this.openHome()
      return
    })
  }

  unlistenToBackAndroid () {
    BackAndroid.removeEventListener('hardwareBackPress')
  }

  retractMenu () {
    this.props.dispatch(MenuActions.retractMenu())
    /* REFERENCE: http://stackoverflow.com/questions/38206234/backandroid-app-still-closes */
    return true
  }

  openHome () {
    this.props.dispatch(NavigationActions.home())
    /* REFERENCE: http://stackoverflow.com/questions/38206234/backandroid-app-still-closes */
    return true
  }

  render () {
    if (this.isPublisherSection) {
      return this.renderPublisherTimeline()
    } else {
      return this.renderCategoriesTimeline()
    }
  }

  renderCategoriesTimeline () {
    return (
      <CategoriesTimeline params={this.props.route.params}>
        <MenuContainer params={this.props.route.params} />
        {this.renderStoryLinks()}
      </CategoriesTimeline>
    )
  }

  renderPublisherTimeline () {
    return (
      <PublisherTimeline model={this.currentSection.model}>
        <MenuContainer params={this.props.route.params} />
        {this.renderStoryLinks()}
      </PublisherTimeline>
    )
  }

  renderStoryLinks () {
    const { params } = this.props.route
    let section = params.section || {}
    let storyLinks = section.storyLinks || {}
    let publisherSlug = this.isPublisherSection ? params.section.model.slug : ''

    if (!storyLinks.open) return

    return <StoryLinksContainer story={storyLinks.story} publisherSlug={publisherSlug} />
  }

  get currentSection() {
    const { params } = this.props.route
    return params.section || {}
  }

  get isHomeSection () {
    return this.currentSection.name === 'home'
  }

  get isPublisherSection () {
    return this.currentSection.name === 'publisher'
  }
}

TimelineScene.propTypes = {
  route: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  uiReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(TimelineScene)
