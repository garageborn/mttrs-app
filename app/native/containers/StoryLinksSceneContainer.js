import React, { Component } from 'react'
import { View, Image, TouchableHighlight, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import StoryLinks from '../components/StoryLinks'
import CloseButton from '../components/CloseButton'
import styles from '../styles/StoryLinks'
import { NavigationActions } from '@exponent/ex-navigation'

class StoryLinksSceneContainer extends Component {
  constructor(props) {
    super(props)

    this.openLink = this.openLink.bind(this)
    this.rendeRow = this.renderRow.bind(this)
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
      <StoryLinks
        rowID={rowID}
        rowData={rowData}
        openLink={e => this.openLink(rowData)} />
    )
  }

  close() {
    const { dispatch, navigation } = this.props
    dispatch(NavigationActions.pop(navigation.currentNavigatorUID))
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
        <CloseButton onPress={this.close} />
      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(StoryLinksSceneContainer)
