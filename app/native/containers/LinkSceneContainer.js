import React, { Component } from 'react'
import { View, WebView, Platform, ProgressViewIOS, ProgressBarAndroid } from 'react-native'
import { connect } from 'react-redux'
import LinkHeaderContainer from './LinkHeaderContainer'
import styles from '../styles/App'

class LinkSceneContainer extends Component {
  static progress

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

  constructor() {
    super()
    this.state = {
      progress: 0
    }
  }

  componentDidMount() {
    this.progressLoading()
  }

  componentWillUnmount() {
    clearInterval(this.constructor.progress)
  }

  progressLoading() {
    this.constructor.progress = setInterval(() => {
      this.setState({
        progress: this.state.progress === 1 ? 1 : Math.min(1, this.state.progress + 0.01)
      })
    }, 17 * 2)
  }

  renderProgressBar = () => {
    if (Platform.OS === 'ios') {
      return <ProgressViewIOS style={{marginTop: 11}} progress={this.state.progress} progressTintColor={'#2672D7'} />
    } else {
      return <ProgressBarAndroid style={{marginTop: -6}} progress={this.state.progress} indeterminate={false} styleAttr='Horizontal' color='#2672D7' />
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
        <WebView
          source={{uri: url}}
          contentInset={{top: 11}}
          startInLoadingState={true}
          renderLoading={this.renderProgressBar}
          />
      </View>
    )
  }
}

export default LinkSceneContainer
