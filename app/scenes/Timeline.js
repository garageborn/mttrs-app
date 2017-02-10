import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TimelineHeaderContainer from '../containers/TimelineHeaderContainer'
import TimelineContainer from '../containers/TimelineContainer'
import StoryLinksContainer from '../containers/StoryLinksContainer'
import { headerHeight } from '../styles/Global'
import { DARK_COLOR } from '../constants/Colors'
import { BackAndroid, Platform } from 'react-native'
import { NavigationActions, MenuActions } from '../actions/index'

class Timeline extends Component {
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
      let { route, uiReducer } = this.props
      if (uiReducer.menu.isOpen) return this.retractMenu()
      if (route.params.section.name !== 'home') return this.openHome()
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
    const { route } = this.props
    return (
      <TimelineContainer params={route.params}>
        {this.renderStoryLinks()}
      </TimelineContainer>
    )
  }

  renderStoryLinks () {
    const { params } = this.props.route
    let section = params.section || {}
    let storyLinks = section.storyLinks || {}
    let publisherSlug = ''

    if (!storyLinks.open) return
    if (section.name === 'publisher') publisherSlug = params.section.model.slug

    return <StoryLinksContainer story={storyLinks.story} publisherSlug={publisherSlug} />
  }
}

Timeline.propTypes = {
  route: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  uiReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(Timeline)
