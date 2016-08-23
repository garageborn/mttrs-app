import React, { Component } from 'react'
import { Linking, ListView, StatusBar } from 'react-native'
import SafariView from 'react-native-safari-view'
import styles from '../styles/app'
import Story from '../components/Story'
import {connect} from 'react-redux'

class StoryList extends Component {
  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.storyList}
        />
    )
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <Story story={rowData} onPress={this.openStory.bind(this)} />
    )
  }

  get dataSource() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    return ds.cloneWithRows(this.props.stories.slice(0, 20))
  }

  openStory(story) {
    console.log('open story')
    SafariView.isAvailable()
      .then(
        SafariView.show({ url: story.url, readerMode: true })
      )
      .then(
        StatusBar.setBarStyle('default')
      )
      .catch(error => {
        // iOS 8 - Fuck it?
        Linking.openURL(story.url)
      })
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    stories: state.StoryReducers.stories,
  }
}
export default connect(mapStateToProps)(StoryList)
