import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, Platform, WebView, View } from 'react-native'
import WebViewError from '../WebViewError'
import captureError from '../../common/utils/captureError'
import styles from './styles'

class StoryWebView extends Component {
  constructor () {
    super()

    this.handleError = this.handleError.bind(this)
    this.reloadWebView = this.reloadWebView.bind(this)
    this.renderLoading = this.renderLoading.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    const currentUrl = this.props.link.url
    const newUrl = nextProps.link.url
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
    const url = this.props.link.amp_url || this.props.link.url

    return (
      <View style={styles.container}>
        {this.props.header}
        <WebView
          contentInset={{top: this.contentInset()}}
          domStorageEnabled
          ref='webview'
          renderError={this.handleError}
          renderLoading={this.renderLoading}
          source={{uri: url}}
          startInLoadingState
        />
      </View>
    )
  }

  renderLoading () {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }
}

StoryWebView.propTypes = {
  header: PropTypes.element,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    amp_url: PropTypes.string
  }).isRequired
}

export default StoryWebView
