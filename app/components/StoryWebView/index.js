import React, { Component, PropTypes } from 'react'
import { View, WebView, Platform } from 'react-native'
import WebViewError from '../WebViewError'
import captureError from '../../common/utils/captureError'
import styles from './styles'

class StoryWebView extends Component {
  constructor () {
    super()

    this.handleError = this.handleError.bind(this)
    this.reloadWebView = this.reloadWebView.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    const currentUrl = this.props.params.link.url
    const newUrl = nextProps.params.link.url
    return currentUrl !== newUrl
  }

  contentInset () {
    return Platform.OS === 'ios' ? 0 : 11
  }

  reloadWebView () {
    this.refs.webview.reload()
  }

  handleError (e) {
    captureError(e)
    return (
      <WebViewError onPressReload={this.reloadWebView} />
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
  url: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired
}

export default StoryWebView
