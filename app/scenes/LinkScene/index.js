import React, { Component, PropTypes } from 'react'
import { InteractionManager, View, Platform, AppState } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import LinkHeaderContainer from '../../containers/LinkHeaderContainer'
import { VisitedStoriesActions } from '../../actions/index'
import { headerHeight } from '../../styles/Global'
import { DARK_COLOR } from '../../constants/Colors'
import StoryWebView from '../../components/StoryWebView'

class LinkScene extends Component {
  // static route = Platform.select({
  //   ios: {
  //     navigationBar: {
  //       renderTitle: (route) => <LinkHeaderContainer link={route.params.link} />,
  //       renderLeft: () => <View />,
  //       renderRight: () => <View />,
  //       backgroundColor: DARK_COLOR,
  //       height: headerHeight + 20 // On Link exclusively, we need to pass this value in order to be aligned
  //     }
  //   },
  //   android: null
  // })

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
    this.setState({ appState })
  }

  addStoryToLocalStorage () {
    const { dispatch, story } = this.props
    dispatch(VisitedStoriesActions.addStory(story))
  }

  renderHeader () {
    const { link } = this.props
    return <LinkHeaderContainer link={link} />
  }

  createAccess () {
    this.props.createLinkAccess()
  }

  render () {
    const { link } = this.props.route.params
    if (this.state.appState !== 'active') return null
    return (
      <View>
        <StoryWebView
          link={link}
          header={this.renderHeader()}
        />
      </View>
    )
  }
}

LinkScene.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      link: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        amp_url: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired,
  story: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired,
  createLinkAccess: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const LinkSceneWithRedux = connect()(LinkScene)
export default withQuery(LinkSceneWithRedux)