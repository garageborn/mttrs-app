import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableHighlight, Text, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../styles/StoryLinks'

class StoryLinksSceneContainer extends Component {
  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.dataSource = this.dataSource.bind(this)
  }

  dataSource() {
    const { links } = this.props.story
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    return ds.cloneWithRows(links)
  }

  isFirst(id, x, y) {
    return id === '0' ? x : y
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View
        shadowOffset={{width: 1, height: 2}}
        shadowColor={'rgba(0, 0, 0, .1)'}
        shadowOpacity={1.0}
        style={this.isFirst(rowID, styles.rowFirst, styles.row)}>
        <View style={this.isFirst(rowID, styles.rowContainerFirst, styles.rowContainer)}>
          <View style={styles.publisher}>
            <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
            <View style={styles.publisherInfo}>
              <Text style={styles.title}>{rowData.publisher.name}</Text>
              <Text style={styles.time}>Ontem às 7:01 {rowID}</Text>
            </View>
          </View>
          <View style={styles.story}>
            <TouchableHighlight style={styles.rowTouch} onPress={e => this.openLink(rowData)}>
              <Text numberOfLines={2} style={styles.storyTitle}>{rowData.title}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { links } = this.props.story

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Também publicado em</Text>
        </View>
        <ListView
          dataSource={this.dataSource()}
          renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)} />
        {this.renderCloseButton()}
      </View>
    )
  }

  renderCloseButton() {
    return (
      <TouchableHighlight onPress={this.close}>
        <Image source={require('../assets/icons/icon-close-modal@3x.png')} />
      </TouchableHighlight>
    )
  }

  close() {
    Actions.pop()
  }

  openLink(link) {
    console.log('openlink', link)
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    story: ownProps.story
  }
}
export default connect(mapStateToProps)(StoryLinksSceneContainer)
