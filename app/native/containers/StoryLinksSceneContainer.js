import React, { Component } from 'react'
import { View, Image, TouchableHighlight, Text, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import StoryLinks from '../components/StoryLinks'
import CloseButton from '../components/CloseButton'
import styles from '../styles/StoryLinks'

class StoryLinksSceneContainer extends Component {
  constructor(props) {
    super(props)

    this.openLink = this.openLink.bind(this)
    this.rendeRow = this.renderRow.bind(this)
    this.dataSource = this.dataSource.bind(this)
  }

  dataSource() {
    const { links } = this.props.story
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    return ds.cloneWithRows(links)
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <StoryLinks
        rowID={rowID}
        rowData={rowData}
        openLink={e => this.openLink(rowData)} />
    )
  }

  close() {
    Actions.pop()
  }

  openLink(link) {
    console.log('openlink', link)
  }

  render() {
    const { links } = this.props.story

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Also published in</Text>
        </View>
        <ListView
          dataSource={this.dataSource()}
          renderRow={this.renderRow} />
        <CloseButton onClose={this.close} />
      </View>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    story: ownProps.story
  }
}
export default connect(mapStateToProps)(StoryLinksSceneContainer)
