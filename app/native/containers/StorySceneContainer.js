import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import StoryHeaderContainer from './StoryHeaderContainer'
import styles from '../styles/App'
import { connect } from 'react-redux'

class StorySceneContainer extends Component {
  render() {
    const { url } = this.props.story

    return (
      <View style={styles.container}>
        <StoryHeaderContainer />
        <WebView source={{uri: url}} />
      </View>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    story: ownProps.story
  }
}
export default connect(mapStateToProps)(StorySceneContainer)
