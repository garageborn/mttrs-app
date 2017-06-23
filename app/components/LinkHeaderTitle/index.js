import React, { PropTypes } from 'react'
import HeaderTitle from '../../components/HeaderTitle'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'

const LinkHeaderTitle = ({ link }) => {
  const title = link.publisher.name
  const subtitle = link.title
  const iconId = link.publisher.icon_id
  const getLogo = () => {
    return <PublisherLogo size={22} source={{uri: cloudinary.id(iconId)}} />
  }

  return <HeaderTitle leftButton logo={getLogo()} title={title} subtitle={subtitle} />
}

LinkHeaderTitle.propTypes = {
  link: PropTypes.shape({
    publisher: PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon_id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default LinkHeaderTitle
