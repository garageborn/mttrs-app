import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import SettingsItem from '../SettingsItem'
import mttrsBrIcon from './assets/mttrs_br.png'
import mttrsUsIcon from './assets/mttrs_us.png'
import styles from './styles'

const images = {
  mttrs_br: mttrsBrIcon,
  mttrs_us: mttrsUsIcon
}

const TenantListItem = ({ active, country, rightContent }) => {
  const containerStyles = active ? styles.active : null
  const leftContent = <Image source={images[country.tenantId]} />
  return (
    <View style={containerStyles}>
      <SettingsItem leftContent={leftContent} rightContent={rightContent} title={country.name} subtitle={country.language} />
    </View>
  )
}

TenantListItem.propTypes = {
  active: PropTypes.bool,
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }),
  rightContent: PropTypes.element
}

export default TenantListItem
