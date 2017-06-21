import React, { Component, PropTypes } from 'react'
import { View, AppState } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import StoryWebView from '../../components/StoryWebView'
import LinkHeaderTitle from '../../components/LinkHeaderTitle'
import LinkHeaderRight from '../../components/LinkHeaderRight'
import HeaderLeft from '../../components/HeaderLeft'
import CategoryColor from '../../components/CategoryColor'
import AnalyticsContainer from '../../containers/AnalyticsContainer'
import headerStyles from '../../styles/Header'
import { NotificationsActions } from '../../actions/index'

class LinkScene extends Component {
  constructor () {
    super()
    this.state = { appState: AppState.currentState }
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }

  componentWillMount () {
    this.createAccess()
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.props.dispatch(NotificationsActions.askForPermissions())
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange (appState) {
    this.setState({ appState })
  }

  createAccess () {
    this.props.createLinkAccess()
  }

  render () {
    const { link, story } = this.props.navigation.state.params
    if (this.state.appState !== 'active') return null
    return (
      <AnalyticsContainer scene={'link'} screenName={`/link/${link.slug}`}>
        <View>
          <CategoryColor category={story.category} />
          <StoryWebView link={link} />
        </View>
      </AnalyticsContainer>
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
        }).isRequired,
        story: PropTypes.shape({
          id: PropTypes.any.isRequired,
          category: PropTypes.shape({
            color: PropTypes.string
          })
        })
      }).isRequired
    })
  }).isRequired,
  createLinkAccess: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

LinkScene.navigationOptions = props => {
  return {
    headerTitle: <LinkHeaderTitle {...props} />,
    headerRight: <LinkHeaderRight {...props} />,
    headerLeft: <HeaderLeft {...props} />,
    ...headerStyles
  }
}

const LinkSceneWithRedux = connect()(LinkScene)
export default withQuery(LinkSceneWithRedux)
