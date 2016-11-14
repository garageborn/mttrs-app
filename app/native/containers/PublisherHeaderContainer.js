import React, { Component, PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import Header from '../components/Header'
import PublisherLogo from '../components/PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import { NavigationActions } from '@exponent/ex-navigation'
import styles from '../styles/PublisherHeader'

class PublisherHeaderContainer extends Component {
  getPublisherLogo() {
    const { publisher } = this.props
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return { uri }
  }

  get icon() {
    return <PublisherLogo skin='dark' source={this.getPublisherLogo()} />
  }

  render() {
    const { toggleMenu, publisher } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.left} />
        <Header
          toggleMenu={toggleMenu}
          title={publisher.name}
          icon={this.icon}
        />
        <View style={styles.right}>
          <Image source={require('../assets/starInactive.png')}/>
        </View>
      </View>
    )
  }
}

PublisherHeaderContainer.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired
}
export default PublisherHeaderContainer
