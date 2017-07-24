import React, { Component, PropTypes } from 'react'
import { View, AppState } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import StoryWebView from '../../components/StoryWebView'
import LinkHeaderTitleContainer from '../../containers/LinkHeaderTitleContainer'
import LinkHeaderRight from '../../components/LinkHeaderRight'
import HeaderLeft from '../../components/HeaderLeft'
import CategoryColor from '../../components/CategoryColor'
import AnalyticsContainer from '../../containers/AnalyticsContainer'
import OrientationContainer from '../../containers/OrientationContainer'
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
    const { slug } = this.props.navigation.state.params
    const { data } = this.props
    if (this.state.appState !== 'active') return null
    if (!data.link || data.loading || !data.link.category) return null

    return (
      <AnalyticsContainer scene={'link'} screenName={`/link/${slug}`}>
        <View>
          <OrientationContainer />
          <CategoryColor category={data.link.category} />
          <StoryWebView link={data.link} />
        </View>
      </AnalyticsContainer>
    )
  }
}

LinkScene.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    })
  }).isRequired,
  createLinkAccess: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    link: PropTypes.shape({
      category: PropTypes.object
    })
  }).isRequired
}

LinkScene.navigationOptions = props => {
  return {
    ...headerStyles,
    headerTitle: <LinkHeaderTitleContainer {...props} />,
    headerRight: <LinkHeaderRight {...props} />,
    headerLeft: <HeaderLeft {...props} />
  }
}

const LinkSceneWithRedux = connect()(LinkScene)
export default withQuery(LinkSceneWithRedux)
