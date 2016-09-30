import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/HeaderPublisher'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'
import Share from 'react-native-share'

class LinkHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
    this.share = this.share.bind(this)
  }

  share() {
    const { link } = this.props

    let shareOptions = {
      title: link.title,
      message: link.description || link.title,
      url: link.url
    }

    return Share.open(shareOptions)
  }

  render() {
    const { link } = this.props

    return (
      <View style={styles.header} shadowOffset={{width: 1, height: 1}} shadowColor={'rgba(0, 0, 0, .5)'} shadowOpacity={1.0} elevation={5}>
        <View style={styles.publisher}>
          <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
          <View style={styles.publisherInfo}>
            <Text style={styles.title}>{link.publisher.name}</Text>
            <Text style={styles.time}>Ontem às 7:01</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableHighlight onPress={this.share}>
            <Image style={styles.iconShare} source={require('../assets/icons/icon-share.png')} />
          </TouchableHighlight>
          {/* onPress Mockup! */}
          <TouchableHighlight onPress={this.close}>
            <Image style={styles.iconClose} source={require('../assets/icons/icon-close.png')} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  close() {
    const { dispatch, navigation } = this.props
    dispatch(NavigationActions.pop(navigation.currentNavigatorUID))
  }
}

let mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(LinkHeaderContainer)
