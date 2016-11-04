import React, { Component } from 'react'
import { View, Text, ListView, Modal } from 'react-native'
import { connect } from 'react-redux'
import StoryLink from '../components/StoryLink'
import CloseButton from '../components/CloseButton'
import styles from '../styles/StoryLinks'
import { NavigationActions } from '../actions/index'
import LinearGradient from 'react-native-linear-gradient'

class StoryLinksContainer extends Component {
  constructor(props) {
    super(props)

    this.openLink = this.openLink.bind(this)
    this.openPublisher = this.openPublisher.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = this.dataSource.bind(this)
    this.close = this.close.bind(this)
  }

  dataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    return ds.cloneWithRows(this.otherLinks)
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <StoryLink
        linkType='list'
        rowID={rowID}
        link={rowData}
        openLink={this.openLink}
        openPublisher={this.openPublisher}
      />
    )
  }

  close() {
    this.props.dispatch(NavigationActions.storyLinks({ open: false }))
  }

  openLink(link) {
    this.close()
    this.props.dispatch(NavigationActions.link(this.props.story, link))
  }

  openPublisher(publisher) {
    this.close()
    this.props.dispatch(NavigationActions.selectPublisher(publisher))
  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={true}
        onRequestClose={this.close}>
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.header}>
              <StoryLink
                linkType='header'
                link={this.mainLink}
                openLink={this.openLink}
                openPublisher={this.openPublisher}
              />
            </View>
            <ListView
              style={styles.linksList}
              dataSource={this.dataSource()}
              renderRow={this.renderRow}
            />
            <LinearGradient
              colors={['rgba(255,255,255,.2)', 'rgba(255,255,255,.6)', 'rgba(255,255,255,.8)']}
              style={styles.gradient}
            />
          </View>
          <CloseButton onPress={this.close} />
        </View>
      </Modal>
    )
  }

  get mainLink() {
    return this.props.story.main_link
  }

  get otherLinks() {
    return this.props.story.other_links
  }
}

export default connect()(StoryLinksContainer)
