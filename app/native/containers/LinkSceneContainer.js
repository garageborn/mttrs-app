import React, { Component } from 'react'
import { View, WebView, Platform } from 'react-native'
import LinkHeaderContainer from './LinkHeaderContainer'
import styles from '../styles/App'
import { connect } from 'react-redux'

class LinkSceneContainer extends Component {
  static route = {
    navigationBar: {
      ...Platform.select({
        ios: {
          renderLeft: () => <View />,
          renderTitle: (route) => <LinkHeaderContainer link={route.params.link}/>,
          backgroundColor: '#262C5B'
        },
        android: {
          visible: false
        }
      })
    }
  }

  render() {
    const { url } = this.props.route.params.link

    return (
      <View style={styles.container}>
        {/* Waiting for the new ex-navigation release which will fix this */}
        {Platform.OS === 'android' &&
          <LinkHeaderContainer link={this.props.route.params.link} />
        }
        <WebView source={{uri: url}} contentInset={{top: 11}}/>
      </View>
    )
  }
}

export default LinkSceneContainer
