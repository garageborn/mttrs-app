import React, { Component, PropTypes } from 'react'
import { View, WebView, Platform, Animated, Easing, Dimensions, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import LinkHeaderContainer from './LinkHeaderContainer'
import ProgressBar from '../components/ProgressBar'
import { StorageActions } from '../actions/index'
import { headerHeight } from '../styles/Header'

class LinkSceneContainer extends Component {
  static route = Platform.OS === 'ios'
  ? {
      navigationBar: {
        renderTitle: (route) => <LinkHeaderContainer link={route.params.link}/>,
        renderLeft: () =>  <View />,
        renderRight: () =>  <View />,
        backgroundColor: '#262C5B',
        height: headerHeight + 20 // On LinkSceneContainer exclusively, we need to pass this value in order to be aligned
      }
    }
  : null

  renderNavbar(props) {
    if (Platform.OS === 'ios') return
    return <LinkHeaderContainer link={props.route.params.link} />
  }

  constructor() {
    super()

    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    this.addStoryToLocalStorage = this.addStoryToLocalStorage.bind(this)
    this.progress = new Animated.Value(0)
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

  get contentInset() {
    return Platform.OS === 'ios' ? 0 : 11
  }

  render() {
    const { url } = this.props.route.params.link

    return (
      <View>
        {this.renderNavbar(this.props)}
        <WebView
          source={{uri: url}}
          contentInset={{top: this.contentInset}}
          startInLoadingState={true}
          renderLoading={this.renderProgressBar}
          onLoadEnd={this.addStoryToLocalStorage}
          mediaPlaybackRequiresUserAction={true}
        />
      </View>
    )
  }
}

LinkSceneContainer.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      story: PropTypes.object.isRequired,
      link: PropTypes.object.isRequired
    }).isRequired,
  }).isRequired
}

export default connect()(LinkSceneContainer)
