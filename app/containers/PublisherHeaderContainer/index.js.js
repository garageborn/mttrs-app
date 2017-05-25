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
    return <Header title={this.title} icon={this.icon} type='publisher' />
  }
}

PublisherHeaderContainer.propTypes = {
  publisher: PropTypes.shape({
    display_name: PropTypes.string,
    icon_id: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default PublisherHeaderContainer
