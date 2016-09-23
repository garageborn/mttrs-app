import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/Header'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

class StoryLinksSceneContainer extends Component {
  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.renderLink = this.renderLink.bind(this)
  }

  render() {
    const { links } = this.props.story

    return (
      <View>
        { links.map(this.renderLink) }
        { this.renderCloseButton() }
      </View>
    )
  }

  renderLink(link) {
    return (
      <TouchableHighlight key={link.id} onPress={e => this.openLink(link)}>
        <View>
          <Text>{link.publisher.name}</Text>
          <Text>{link.title}</Text>
        </View>
      </TouchableHighlight>
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
