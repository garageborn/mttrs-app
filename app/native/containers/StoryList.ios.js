import React, { Component } from 'react'
import { ListView } from 'react-native'
import styles from '../styles/app'
import Story from '../components/Story'
import { connect } from 'react-redux'

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
      <Story story={rowData} />
    )
  }

  get dataSource() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    return ds.cloneWithRows(this.props.stories.slice(0, 20))
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    stories: state.StoryReducers.stories,
  }
}
export default connect(mapStateToProps)(StoryList)
