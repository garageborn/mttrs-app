import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import styles from '../styles/Header'
import { Actions } from 'react-native-router-flux'

class CategoryHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  render() {
    const { name } = this.props.currentCategory
    return (
      <View>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.toggleMenu}>
            <Text>{name}</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  toggleMenu() {
    Actions.menu()
  }
}

let mapStateToProps = (state) => {
  return {
    currentCategory: state.CurrentCategoryReducer.category
  }
}
export default connect(mapStateToProps)(CategoryHeaderContainer)
