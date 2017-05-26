import React, { Component, PropTypes } from 'react'
import { InteractionManager, View, AppState } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { VisitedStoriesActions } from '../../actions/index'
import StoryWebView from '../../components/StoryWebView'
import LinkHeaderTitle from '../../components/LinkHeaderTitle'
import HeaderShareButton from '../../components/HeaderShareButton'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

class LinkScene extends Component {
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
    const { dispatch, navigation } = this.props
    const { story } = navigation.state.params
    dispatch(VisitedStoriesActions.addStory(story))
  }

  createAccess () {
    this.props.createLinkAccess()
  }

  render () {
    const { link } = this.props.navigation.state.params
    if (this.state.appState !== 'active') return null
    return (
      <View>
        <StoryWebView
          link={link}
        />
      </View>
    )
  }
}

LinkScene.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        link: PropTypes.shape({
          slug: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
          amp_url: PropTypes.string
        }).isRequired
      }).isRequired
    })
  }).isRequired,
  createLinkAccess: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

LinkScene.navigationOptions = props => {
  return {
    headerTitle: <LinkHeaderTitle {...props} />,
    headerRight: <HeaderShareButton link={props.navigation.state.params.link} />,
    headerLeft: <HeaderLeft {...props} />,
    ...headerStyles
  }
}

const LinkSceneWithRedux = connect()(LinkScene)
export default withQuery(LinkSceneWithRedux)
