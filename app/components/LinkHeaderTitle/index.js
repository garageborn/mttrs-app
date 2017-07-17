import React, { PropTypes } from 'react'
import HeaderTitle from '../../components/HeaderTitle'
import PublisherLogo from '../PublisherLogo'

const LinkHeaderTitle = ({ link }) => {
  if (!link.publisher) return null
  const title = link.publisher.name
  const subtitle = link.title
  const iconId = link.publisher.icon.xsmall
  const getLogo = () => {
    return <PublisherLogo size={22} source={{uri: iconId}} />
  }

  return <HeaderTitle leftButton logo={getLogo()} title={title} subtitle={subtitle} />
}

LinkHeaderTitle.propTypes = {
  link: PropTypes.shape({
    publisher: PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.shape({
        small: PropTypes.string
      })
    }).isRequired
  }).isRequired
}

export default LinkHeaderTitle
