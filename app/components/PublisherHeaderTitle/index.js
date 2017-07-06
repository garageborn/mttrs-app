import React, { PropTypes } from 'react'
import HeaderTitle from '../../components/HeaderTitle'
import PublisherLogo from '../PublisherLogo'

const PublisherHeaderTitle = ({ navigation }) => {
  const { publisher } = navigation.state.params
  const title = publisher.display_name || publisher.name
  const icon = publisher.icon.xsmall
  const getLogo = () => {
    if (!icon) return null
    return <PublisherLogo size={22} source={{uri: icon}} />
  }

  return <HeaderTitle leftButton logo={getLogo()} title={title} />
}

PublisherHeaderTitle.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        publisher: PropTypes.shape({
          icon: PropTypes.shape({
            xsmall: PropTypes.string
          })
        })
      })
    }).isRequired
  }).isRequired
}

export default PublisherHeaderTitle
