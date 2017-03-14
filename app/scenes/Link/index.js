import React, { Component, PropTypes } from 'react'
import { InteractionManager, View, Platform, AppState } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import LinkHeaderContainer from '../../containers/LinkHeaderContainer'
import { StorageActions, AnalyticsActions } from '../../actions/index'
import { headerHeight } from '../../styles/Global'
import { DARK_COLOR } from '../../constants/Colors'
import StoryWebView from '../../components/StoryWebView'

class LinkScene extends Component {
  static route = Platform.select({
    ios: {
      navigationBar: {
        renderTitle: (route) => <LinkHeaderContainer params={route.params} />,
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
    AppState.addEventListener('change', this.handleAppStateChange)
    InteractionManager.runAfterInteractions(this.addStoryToLocalStorage)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange (appState) {
    if (appState === 'active') this.handleAnalytics()
    this.setState({ appState })
  }

  handleAnalytics () {
    this.props.dispatch(
      AnalyticsActions.trackScreen(`/link/${this.props.route.params.link.slug}`)
    )
  }

  addStoryToLocalStorage () {
    const { dispatch, story } = this.props
    dispatch(StorageActions.addVisitedStory(story))
  }

  renderHeader (props) {
    if (Platform.OS === 'ios') return
    return <LinkHeaderContainer params={props.route.params} />
  }

  createAccess () {
    this.props.createLinkAccess()
  }

  render () {
    const { url } = this.props.route.params.link
    if (this.state.appState !== 'active') return null
    return (
      <StoryWebView
        url={url}
        params={this.props.route.params}
        header={this.renderHeader(this.props)}
      />
    )
  }
}

LinkScene.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      link: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  story: PropTypes.object.isRequired,
  createLinkAccess: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const LinkSceneWithRedux = connect()(LinkScene)
export default withQuery(LinkSceneWithRedux)
