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

  componentWillReceiveProps (nextProps) {
    this.setParams(nextProps)
  }

  handleAppStateChange (appState) {
    this.setState({ appState })
  }

  createAccess () {
    this.props.createLinkAccess()
  }

  setParams (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    if (nextProps.data.loading) return
    return this.props.navigation.setParams(nextProps.data)
  }

  render () {
    const { slug } = this.props.navigation.state.params
    const { data } = this.props
    if (this.state.appState !== 'active') return null
    if (data.loading) return null

    return (
      <AnalyticsContainer scene={'link'} screenName={`/link/${slug}`}>
        <View>
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
  const noDataHeader = {
    ...headerStyles,
    headerLeft: <HeaderLeft {...props} />
  }
  if (!props.screenProps.data) return noDataHeader
  return {
    headerTitle: <LinkHeaderTitle {...props} />,
    headerRight: <LinkHeaderRight {...props} />,
    ...noDataHeader
  }
}

const LinkSceneWithRedux = connect()(LinkScene)
export default withQuery(LinkSceneWithRedux)
