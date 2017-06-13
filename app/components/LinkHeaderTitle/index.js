import React, { PropTypes } from 'react'
import HeaderTitle from '../../components/HeaderTitle'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'

const LinkHeaderTitle = ({ navigation }) => {
  const { link } = navigation.state.params
  const title = link.publisher.name
  const subtitle = link.title
  const iconId = link.publisher.icon_id
  const getLogo = () => {
    if (!iconId) return null
    return <PublisherLogo size={22} source={{uri: cloudinary.id(iconId)}} />
  }

  return <HeaderTitle leftButton logo={getLogo()} title={title} subtitle={subtitle} />
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
