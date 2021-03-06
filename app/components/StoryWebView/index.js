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
    return this.props.link.url !== nextProps.link.url
  }

  contentInset () {
    return Platform.OS === 'ios' ? 0 : 11
  }

  reloadWebView () {
    this.refs.webview.reload()
  }

  handleError (e) {
    captureError(e)
    return <WebViewError onPressReload={this.reloadWebView} />
  }

  render () {
    const url = this.props.link.amp_url || this.props.link.url
    if (!url) return null
    return (
      <View style={styles.container}>
        <WebView
          contentInset={{top: this.contentInset()}}
          domStorageEnabled
          ref='webview'
          renderError={this.handleError}
          source={{uri: url}}
        />
      </View>
    )
  }
}

StoryWebView.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    amp_url: PropTypes.string
  }).isRequired
}

export default StoryWebView
