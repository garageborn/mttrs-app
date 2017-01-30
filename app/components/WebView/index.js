import React from 'react'
import { Platform } from 'react-native'
import WKWebView from 'react-native-wkwebview-reborn'
import CrossWalkWebView from 'react-native-webview-crosswalk'

const Component = Platform.select({
  ios: WKWebView,
  android: CrossWalkWebView
})

const WebView = props => <Component {...props} />

export default WebView
