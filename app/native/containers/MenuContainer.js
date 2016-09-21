import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

class MenuContainer extends Component {
  render() {
    return (
      <View style={{paddingTop: 28}}>
        <TouchableHighlight onPress={() => Actions.category({ categorySlug: 'business' })}>
          <Text>Category</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => Actions.publisher({ publisherSlug: 'forbes' })}>
          <Text>Publisher</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default MenuContainer
