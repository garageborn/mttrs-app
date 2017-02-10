import React, { Component, PropTypes } from 'react'
import { View, WebView, Platform } from 'react-native'
import captureError from '../../common/utils/captureError'
import styles from './styles'

class StoryWebView extends Component {
  contentInset () {
    return Platform.OS === 'ios' ? 0 : 11
  }

  handleError = (e) => {
    captureError(e)
    if (e === 'WebKitErrorDomain') return
    // return <View></View>
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.header}
        <WebView
          ref='webview'
          source={{uri: this.props.url}}
          contentInset={{top: this.contentInset()}}
          renderError={this.handleError}
          onLoadEnd={this.props.onLoadEnd}
          mediaPlaybackRequiresUserAction
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
