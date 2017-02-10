import React, { Component, PropTypes } from 'react'
import { View, WebView, Platform, Linking } from 'react-native'
import WebViewError from '../WebViewError'
import captureError from '../../common/utils/captureError'
import styles from './styles'

class StoryWebView extends Component {
  constructor () {
    super()

    this.handleError = this.handleError.bind(this)
    this.reloadWebView = this.reloadWebView.bind(this)
    this.openInBrowser = this.openInBrowser.bind(this)
  }

  contentInset () {
    return Platform.OS === 'ios' ? 0 : 11
  }

  reloadWebView () {
    this.refs.webview.reload()
  }

  openInBrowser () {
    Linking
      .openURL(this.props.url)
      .catch(e => captureError(e))
  }

  handleError (e) {
    captureError(e)
    return (
      <WebViewError
        onPressReload={this.reloadWebView}
        onPressOpenInBrowser={this.openInBrowser}
      />
    )
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
