import React, { Component } from 'react'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import Share from 'react-native-share'
import styles from '../styles/HeaderWebview'
import Router from '../config/Router'
import PublisherLogo from '../components/PublisherLogo'
import * as cloudinary from '../common/utils/Cloudinary'
import { NavigationActions } from '../actions/index'
import { COLORLESS } from '../constants/TouchUnderlayColors'

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

  get publisherLogo() {
    const { publisher } = this.props.link
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return { uri }
  }

  render() {
    const { link } = this.props

    return (
      <View style={styles.header} shadowOffset={{width: 0, height: 5}} shadowColor={'rgba(0, 0, 0, .6)'} shadowOpacity={.1} elevation={1}>
        <View style={styles.publisher}>
          <PublisherLogo size={25} skin='dark' source={this.publisherLogo} />
          <View style={styles.publisherInfo}>
            <Text style={styles.title}>{link.publisher.name}</Text>
            <Text style={styles.storyTitle} numberOfLines={1}>{link.title}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableHighlight style={styles.iconHighlight} underlayColor={COLORLESS} onPress={this.share}>
            <Image style={styles.iconShare} source={require('../assets/icons/icon-share.png')} />
          </TouchableHighlight>
          <TouchableHighlight style={[styles.iconHighlight, styles.iconCloseHighlight]} underlayColor={COLORLESS} onPress={this.close}>
            <Image style={styles.iconClose} source={require('../assets/icons/icon-close.png')} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  close() {
    this.props.dispatch(NavigationActions.back())
  }
}

export default connect()(LinkHeaderContainer)