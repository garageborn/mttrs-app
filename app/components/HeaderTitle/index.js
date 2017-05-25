import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import headerStyles from '../../styles/Header'
import styles from './styles'

const HeaderTitle = (props) => {
  const renderIcon = () => {
    if (props.type !== 'publisher') return null
    let { publisher } = props.navigation.state.params
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={22} source={{ uri }} />
  }

  const containerStyles = () => {
    if (props.type === 'publisher') return styles.publisherContainer
    return styles.container
  }

  return (
    <View style={containerStyles()}>
      {renderIcon()}
      <Text style={[headerStyles.headerTitleStyle, styles.text]}>{props.title}</Text>
    </View>
  )
}

HeaderTitle.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        publisher: PropTypes.object.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default HeaderTitle
