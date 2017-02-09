import React, { Component, PropTypes } from 'react'
import { Animated, Easing, View, WebView, Platform, Dimensions } from 'react-native'
import ProgressBar from '../ProgressBar'
import captureError from '../../common/utils/captureError'
import styles from './styles'

class StoryWebView extends Component {
  constructor () {
    super()

    this.progress = new Animated.Value(0)
  }

  componentDidMount () {
    this.progressTransition()
  }

  contentInset () {
    return Platform.OS === 'ios' ? 0 : 11
  }

  handleError = (e) => {
    captureError(e)
    if (e === 'WebKitErrorDomain') return
  }

  progressTransition () {
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

  getProgress () {
    const { width } = Dimensions.get('window')
    return this.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width]
    })
  }

  renderProgressBar = () => {
    return <ProgressBar progress={this.getProgress()} />
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.header}
        <WebView
          source={{uri: this.props.url}}
          contentInset={{top: this.contentInset()}}
          renderLoading={this.renderProgressBar}
          renderError={this.handleError}
          onLoadEnd={this.props.onLoadEnd}
          mediaPlaybackRequiresUserAction
          startInLoadingState
        />
      </View>
    )
  }
}

StoryWebView.propTypes = {
  header: PropTypes.element,
  onLoadEnd: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
}

export default StoryWebView
