import React, { Component } from 'react'
import { View, Text, ListView, Modal } from 'react-native'
import { connect } from 'react-redux'
import StoryLink from '../components/StoryLink'
import CloseButton from '../components/CloseButton'
import styles from '../styles/StoryLinks'
import { NavigationActions } from '../actions/index'

class StoryLinksContainer extends Component {
  constructor(props) {
    super(props)

    this.openLink = this.openLink.bind(this)
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
        openLink={this.openLink} />
    )
  }

  close() {
    this.props.dispatch(NavigationActions.storyLinks({ open: false }))
  }

  openLink(link) {
    this.close()
    this.props.dispatch(NavigationActions.link(link))
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
            <View style={styles.header} shadowOffset={{width: 0, height: 4}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={.06}>
              <StoryLink
                linkType='header'
                link={this.mainLink}
                openLink={this.openLink} />
            </View>
            <Text style={styles.subHeaderText}>Also published in</Text>
            <ListView
              dataSource={this.dataSource()}
              renderRow={this.renderRow} />
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
