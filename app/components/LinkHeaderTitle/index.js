import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

class LinkHeaderTitle extends Component {
  render () {
    return (
      <View style={styles.container}>
        <HeaderTitle logo={this.logo()} title={this.title} subtitle={this.subtitle} />
      </View>
    )
  }

  logo () {
    if (!this.logoURI) return null
    return <PublisherLogo size={22} source={{uri: this.logoURI}} />
  }

  get title () {
    const { link } = this.props.navigation.state.params
    return link.publisher.name
  }

  get subtitle () {
    const { link } = this.props.navigation.state.params
    return link.title
  }

  get iconId () {
    const { link } = this.props.navigation.state.params
    return link.publisher.icon_id
  }

  get logoURI () {
    if (!this.iconId) return null
    return cloudinary.id(this.iconId, { secure: true })
  }
}

LinkHeaderTitle.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        link: PropTypes.object
      })
    }).isRequired
  }).isRequired
}

export default LinkHeaderTitle
