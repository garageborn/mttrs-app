import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

class PublisherHeaderTitle extends Component {
  render () {
    return (
      <View style={styles.container}>
        <HeaderTitle logo={this.logo} title={this.title} />
      </View>
    )
  }

  get title () {
    const { publisher } = this.props.navigation.state.params
    return publisher.name
  }

  get iconId () {
    const { publisher } = this.props.navigation.state.params
    return publisher.icon_id
  }

  get logo () {
    if (!this.iconId) return null
    const uri = cloudinary.id(this.iconId, { secure: true })
    return uri
  }
}

PublisherHeaderTitle.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        publisher: PropTypes.object
      })
    }).isRequired
  }).isRequired
}

export default PublisherHeaderTitle
