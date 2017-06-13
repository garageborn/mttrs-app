import React, { PropTypes } from 'react'
import HeaderTitle from '../../components/HeaderTitle'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'

const PublisherHeaderTitle = ({ navigation }) => {
  const { publisher } = navigation.state.params
  const title = publisher.display_name || publisher.name
  const iconId = publisher.icon_id
  const getLogo = () => {
    if (!iconId) return null
    return <PublisherLogo size={22} source={{uri: cloudinary.id(iconId)}} />
  }

  return <HeaderTitle leftButton logo={getLogo()} title={title} />
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
