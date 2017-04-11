import React, { Component, PropTypes } from 'react'
import { InteractionManager, View, Platform, AppState } from 'react-native'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import withQuery from './index.gql'
import LinkHeaderContainer from '../../containers/LinkHeaderContainer'
import { StorageActions } from '../../actions/index'
import { headerHeight } from '../../styles/Global'
import { DARK_COLOR } from '../../constants/Colors'
import StoryWebView from '../../components/StoryWebView'
import { injectAnalytics } from '../../config/AnalyticsProvider'

class LinkScene extends Component {
  static route = Platform.select({
    ios: {
      navigationBar: {
        renderTitle: (route) => <LinkHeaderContainer link={route.params.link} />,
        renderLeft: () => <View />,
        renderRight: () => <View />,
        backgroundColor: DARK_COLOR,
        height: headerHeight + 20 // On Link exclusively, we need to pass this value in order to be aligned
      }
    },
    android: null
  })

  constructor () {
    super()
    this.state = { appState: AppState.currentState }
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
    this.addStoryToLocalStorage = this.addStoryToLocalStorage.bind(this)
  }

  componentWillMount () {
    this.createAccess()
  }

  componentDidMount () {
    this.props.analytics.trackScreen(this.analyticsScreen)
    AppState.addEventListener('change', this.handleAppStateChange)
    InteractionManager.runAfterInteractions(this.addStoryToLocalStorage)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange (appState) {
    this.setState({ appState })
  }

  addStoryToLocalStorage () {
    const { dispatch, story } = this.props
    dispatch(StorageActions.addVisitedStory(story))
  }

  renderHeader () {
    if (Platform.OS === 'ios') return
    const { link } = this.props
    return <LinkHeaderContainer link={link} />
  }

  createAccess () {
    this.props.createLinkAccess()
  }

  render () {
    const { url } = this.props.route.params.link
    if (this.state.appState !== 'active') return null
    return (
      <View>
        <StoryWebView
          url={url}
          params={this.props.route.params}
          header={this.renderHeader()}
        />
      </View>
    )
  }

  get analyticsScreen () {
    let slug = _result(this.props, 'route.params.link.slug')
    if (!slug) return
    return `/link/${ slug }`
  }
}

LinkScene.propTypes = {
  analytics: PropTypes.shape({
    trackScreen: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      link: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  story: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired,
  createLinkAccess: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const LinkSceneWithAnalytics = injectAnalytics(LinkScene)
const LinkSceneWithRedux = connect()(LinkSceneWithAnalytics)
export default withQuery(LinkSceneWithRedux)
