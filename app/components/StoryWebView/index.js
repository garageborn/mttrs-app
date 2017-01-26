import React, { PropTypes } from 'react'
import { View, WebView } from 'react-native'
import styles from './styles'

const StoryWebView = ({ url, navBar, contentInset, renderLoading, renderError, onLoadEnd }) => {
  return (
    <View style={styles.container}>
      {navBar}
      <WebView
        source={{uri: url}}
        contentInset={{top: contentInset}}
        renderLoading={renderLoading}
        renderError={renderError}
        onLoadEnd={onLoadEnd}
        shouldStartLoadWithRequest={false}
        startInLoadingState
        mediaPlaybackRequiresUserAction
      />
    </View>
  )
}

StoryWebView.propTypes = {
  url: PropTypes.string.isRequired,
  navBar: PropTypes.element.isRequired,
  contentInset: PropTypes.number.isRequired,
  renderLoading: PropTypes.func.isRequired,
  renderError: PropTypes.func.isRequired,
  onLoadEnd: PropTypes.func.isRequired
}

export default WebView
