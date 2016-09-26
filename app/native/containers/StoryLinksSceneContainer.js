import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableHighlight, Text, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../styles/StoryLinks'

class StoryLinksSceneContainer extends Component {
  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.renderLink = this.renderLink.bind(this)
    this.dataSource = this.dataSource.bind(this)
  }

  dataSource() {
    const { links } = this.props.story
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    return ds.cloneWithRows(links)
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight style={styles.publisherTouch} onPress={e => this.openLink(link)}>
        <View>
          <View style={styles.publisher}>
            <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
            <View style={styles.publisherInfo}>
              <Text style={styles.title}>{rowData.publisher.name}</Text>
              <Text style={styles.time}>Ontem às 7:01</Text>
            </View>
          </View>
          <View style={styles.story}>
            <Text numberOfLines={2} style={styles.storyTitle}>{rowData.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
          renderRow={(rowData) => this.renderRow(rowData)} />
        {this.renderCloseButton()}
      </View>
    )
  }

  renderCloseButton() {
    return (
      <TouchableHighlight onPress={this.close}>
        <View>
          <Text>Close</Text>
        </View>
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
