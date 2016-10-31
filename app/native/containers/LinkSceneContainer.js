import React, { Component } from 'react'
import { View, WebView, Platform, Animated, Easing } from 'react-native'
import LinkHeaderContainer from './LinkHeaderContainer'
import ProgressBar from '../components/ProgressBar'
import styles from '../styles/App'

class LinkSceneContainer extends Component {
  constructor() {
    super()
    this.progress = new Animated.Value(0)
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    this.progress.setValue(0)
    Animated.timing(
      this.progress,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  renderProgressBar = () => {
    const width = this.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 400]
    })

    return (
      <Animated.View
        style={{
          height: 3,
          width,
          backgroundColor: '#08C'
        }}
      />
    )
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
          renderLoading={this.renderProgressBar}
          />
      </View>
    )
  }
}

export default LinkSceneContainer
