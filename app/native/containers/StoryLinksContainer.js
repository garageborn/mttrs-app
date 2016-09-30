import React, { Component } from 'react'
import { View, Text, ListView, Modal } from 'react-native'
import { connect } from 'react-redux'
import StoryLink from '../components/StoryLink'
import CloseButton from '../components/CloseButton'
import styles from '../styles/StoryLinks'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

class StoryLinksContainer extends Component {
  constructor(props) {
    super(props)

    this.openLink = this.openLink.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = this.dataSource.bind(this)
    this.close = this.close.bind(this)
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
      <StoryLink
        rowID={rowID}
        link={rowData}
        openLink={this.openLink} />
    )
  }

  close() {
    const { dispatch, navigation, params, story } = this.props
    let sectionParams = Object.assign({}, params.section, { storyLinks: null })
    let newParams = Object.assign({}, params, { section: sectionParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }

  openLink(link) {
    // const { dispatch, navigation } = this.props
    // let route = Router.getRoute('link', { link: link })
    // dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
  }

  render() {
    const { links } = this.props.story

    return (
      <View style={styles.modal}>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={true}
        onRequestClose={this.close}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Also published in</Text>
          </View>
          <ListView
            dataSource={this.dataSource()}
            renderRow={this.renderRow} />
        </View>
        <CloseButton onPress={this.close} />
      </Modal>
      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(StoryLinksContainer)
