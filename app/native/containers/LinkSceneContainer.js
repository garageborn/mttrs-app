import React, { Component } from 'react'
import { View, WebView, Platform, Animated } from 'react-native'
import LinkHeaderContainer from './LinkHeaderContainer'
import ProgressBar from '../components/ProgressBar'
import styles from '../styles/App'

class LinkSceneContainer extends Component {
  static progress

  static route = {
    navigationBar: {
      ...Platform.select({
        ios: {
          renderLeft: () => <View />,
          renderTitle: (route) => <LinkHeaderContainer link={route.params.link} />,
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
        progress: this.state.progress === 1 ? 1 : Math.min(0.95, this.state.progress + 0.01)
      })
    }, 50)
  }

  renderProgressBar = () => {
    return <ProgressBar progress={this.state.progress} color='#2672D7' />
  }

  render() {
    const { url } = this.props.route.params.link
    console.log(this.state.progress)
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
