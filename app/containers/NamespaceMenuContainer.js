import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TextInput, ListView, TouchableHighlight, Platform } from 'react-native'
import { NavigationActions, MenuActions, StorageActions } from '../actions/index'
import styles from '../styles/MenuNamespaces'
import apolloClient from '../config/apolloClient'

class NamespaceMenuContainer extends Component {
  onPressNamespaceButton(namespace) {
    this.props.dispatch(NavigationActions.home())
    this.props.dispatch(StorageActions.setCurrentTenant(namespace))
    apolloClient.resetStore()
    this.props.dispatch(MenuActions.retractMenu())
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={[styles.button, this.styles('mttrs')]} onPress={() => this.onPressNamespaceButton('mttrs')}>
          <Text style={styles.text}>{Platform.select({
            ios: '🇺🇸',
            android: 'USA'
          })}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button, this.styles('mttrs_br')]} onPress={() => this.onPressNamespaceButton('mttrs_br')}>
          <Text style={styles.text}>{Platform.select({
            ios: '🇧🇷',
            android: 'BRA'
          })}</Text>
        </TouchableHighlight>
      </View>
    )
  }

  styles(country) {
    const currentNamespace = this.props.StorageReducer.namespace.name
    if (country === currentNamespace) return styles.active
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    StorageReducer: state.StorageReducer
  }
}

export default connect(mapStateToProps)(NamespaceMenuContainer)
