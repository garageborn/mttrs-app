import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import Header from '../components/Header'
import PublisherLogo from '../components/PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import { NavigationActions } from '@exponent/ex-navigation'

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
      <Header
        toggleMenu={toggleMenu}
        title={publisher.name}
        icon={this.icon}
        />
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
