import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import LinkHeaderContainer from './LinkHeaderContainer'
import styles from '../styles/App'
import { connect } from 'react-redux'

class LinkSceneContainer extends Component {
  static route = {
    navigationBar: {
      renderLeft: () => <View />,
      renderTitle: (route) => <LinkHeaderContainer link={route.params.link}/>,
      backgroundColor: '#F5F8FA'
    }
  }

  render() {
    const { url } = this.props.route.params.link

    return (
      <View style={styles.container}>
        <WebView source={{uri: url}} contentInset={{top: 12}}/>
      </View>
    )
  }
}

export default LinkSceneContainer
