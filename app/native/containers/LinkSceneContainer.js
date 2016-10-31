import React, { Component } from 'react'
import { View, WebView, Platform, Animated } from 'react-native'
import LinkHeaderContainer from './LinkHeaderContainer'
import ProgressBar from '../components/ProgressBar'
import styles from '../styles/App'

class LinkSceneContainer extends Component {
  static progress

  constructor() {
    super()
    this.state = {
      progress: 0
    }
  }

  componentDidMount() {
    // this.progressLoading()
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

  get contentInset() {
    return Platform.OS === 'ios' ? 0 : 11
  }

  render() {
    const { url } = this.props.route.params.link

    return (
      <View style={styles.container}>
        <LinkHeaderContainer link={this.props.route.params.link} />
        <WebView
          source={{uri: url}}
          contentInset={{top: this.contentInset}}
          startInLoadingState={true}
          // renderLoading={this.renderProgressBar}
          />
      </View>
    )
  }
}

export default LinkSceneContainer
