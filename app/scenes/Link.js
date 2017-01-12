import React, { Component, PropTypes } from 'react'
import { View, WebView, Platform, Animated, Easing, Dimensions, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './Link.gql'
import LinkHeaderContainer from '../containers/LinkHeaderContainer'
import ProgressBar from '../components/ProgressBar'
import { StorageActions } from '../actions/index'
import { headerHeight } from '../styles/Header'
import styles from '../styles/App'
import { DARK_COLOR } from '../constants/Colors'

class Link extends Component {
  static route = Platform.select({
    ios: {
        navigationBar: {
          renderTitle: (route) => <LinkHeaderContainer link={route.params.link}/>,
          renderLeft: () =>  <View />,
          renderRight: () =>  <View />,
          backgroundColor: DARK_COLOR,
          height: headerHeight + 20 // On Link exclusively, we need to pass this value in order to be aligned
        }
      },
    android: null
  })

  constructor() {
    super()

    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    this.addStoryToLocalStorage = this.addStoryToLocalStorage.bind(this)
    this.progress = new Animated.Value(0)
  }

  componentWillMount () {
    this.createAccess()
  }

  componentDidMount() {
    this.progressTransition()
  }

  addStoryToLocalStorage() {
    const { dispatch, story } = this.props
    dispatch(StorageActions.addVisitedStory(story))
  }

  progressTransition() {
    this.progress.setValue(0)
    Animated.timing(
      this.progress,
      {
        toValue: 2,
        duration: 15000,
        easing: Easing.linear
      }
    ).start(() => this.progressTransition())
  }

  getProgress() {
    const { width } = Dimensions.get('window')
    return this.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width]
    })
  }

  renderProgressBar = () => {
    return <ProgressBar progress={this.getProgress()} />
  }

  handleError = (e) => {
    if (e === 'WebKitErrorDomain') return
  }

  get contentInset() {
    return Platform.OS === 'ios' ? 0 : 11
  }

  renderNavbar(props) {
    if (Platform.OS === 'ios') return
    return <LinkHeaderContainer link={props.route.params.link} />
  }

  render() {
    const { url } = this.props.route.params.link

    return (
      <View style={styles.container}>
        {this.renderNavbar(this.props)}
        <WebView
          source={{uri: url}}
          contentInset={{top: this.contentInset}}
          startInLoadingState={true}
          renderLoading={this.renderProgressBar}
          renderError={this.handleError}
          onLoadEnd={this.addStoryToLocalStorage}
          mediaPlaybackRequiresUserAction={true}
          shouldStartLoadWithRequest={false}
        />
      </View>
    )
  }

  createAccess () {
    this.props.createLinkAccess()
  }
}

Link.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      story: PropTypes.object.isRequired,
      link: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
  }).isRequired
}

const LinkWithRedux = connect()(Link)
export default withQuery(LinkWithRedux)
