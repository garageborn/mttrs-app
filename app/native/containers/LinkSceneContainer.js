import React, { Component } from 'react'
import { View, WebView, Platform, ProgressViewIOS, ProgressBarAndroid } from 'react-native'
import { connect } from 'react-redux'
import LinkHeaderContainer from './LinkHeaderContainer'
import styles from '../styles/App'

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

  constructor() {
    super()
    this.state = {
      progress: 0
    }

    this.updateProgress = this.updateProgress.bind(this)
    this.getProgress = this.getProgress.bind(this)
  }

  componentDidMount() {
    this.updateProgress()
  }

  updateProgress() {
    let progress = this.state.progress + 0.01;
    this.setState({ progress })
  }

  getProgress(offset) {
    let progress = this.state.progress + offset
    return Math.sin(progress % Math.PI) % 1
  }

  renderProgressBar() {
    if (Platform.OS === 'ios') {
      return <ProgressViewIOS style={{marginTop: 11}} progress={this.getProgress(0)} progressTintColor={'#08C'} />
    } else {
      return <ProgressBarAndroid progress={this.state.progress} indeterminate={false} styleAttr='Horizontal' color='#08C' />
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
          onLoadStart={() => console.log('Loading...')}
          onLoad={() => console.log('Done.')}
          startInLoadingState={true}
          renderLoading={this.renderProgressBar.bind(this)} />
      </View>
    )
  }
}

export default LinkSceneContainer
