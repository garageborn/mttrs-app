import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import PublisherLogo from '../components/PublisherLogo'
import * as cloudinary from '../common/utils/Cloudinary'

class PublisherHeaderContainer extends Component {
  getPublisherLogo () {
    const { publisher } = this.props
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return { uri }
  }

  get icon () {
    return <PublisherLogo skin='dark' source={this.getPublisherLogo()} />
  }

  get title () {
    const { publisher } = this.props
    return publisher.display_name || publisher.name
  }

  render () {
    const { toggleMenu, menuIsOpen } = this.props
    return (
      <Header
        toggleMenu={toggleMenu}
        title={this.title}
        icon={this.icon}
        menuIsOpen={menuIsOpen}
        type='publisher'
      />
    )
  }
}

PublisherHeaderContainer.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired,
  menuIsOpen: PropTypes.bool.isRequired
}

export default PublisherHeaderContainer
