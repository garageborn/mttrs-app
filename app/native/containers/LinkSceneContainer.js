import React, { Component, PropTypes } from 'react'
import { View, WebView, Platform, Animated, Easing, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import LinkHeaderContainer from './LinkHeaderContainer'
import ProgressBar from '../components/ProgressBar'
import styles from '../styles/App'
import { StorageActions } from '../actions/index'

class LinkSceneContainer extends Component {
  constructor() {
    super()
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
      <View style={styles.container}>
        <LinkHeaderContainer link={this.props.route.params.link} />
        <WebView
          source={{uri: url}}
          contentInset={{top: this.contentInset}}
          startInLoadingState={true}
          renderLoading={this.renderProgressBar}
          onLoadEnd={this.addStoryToLocalStorage}
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
