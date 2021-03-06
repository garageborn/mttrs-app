import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import SettingsItem from '../SettingsItem'
import iconAR from './assets/mttrs_ar.png'
import iconAU from './assets/mttrs_au.png'
import iconBR from './assets/mttrs_br.png'
import iconCL from './assets/mttrs_cl.png'
import iconMX from './assets/mttrs_mx.png'
import iconPT from './assets/mttrs_pt.png'
import iconUS from './assets/mttrs_us.png'
import iconDE from './assets/mttrs_de.png'
import iconUK from './assets/mttrs_uk.png'
import iconES from './assets/mttrs_es.png'
import iconUSES from './assets/mttrs_us_es.png'
import iconCA from './assets/mttrs_ca.png'
import styles from './styles'

const images = {
  mttrs_ar: iconAR,
  mttrs_au: iconAU,
  mttrs_br: iconBR,
  mttrs_cl: iconCL,
  mttrs_mx: iconMX,
  mttrs_pt: iconPT,
  mttrs_us: iconUS,
  mttrs_de: iconDE,
  mttrs_uk: iconUK,
  mttrs_es: iconES,
  mttrs_us_es: iconUSES,
  mttrs_ca: iconCA
}

const TenantListItem = ({ active, country, rightContent }) => {
  const containerStyles = active ? styles.active : null
  const leftContent = <Image source={images[country.tenantId]} />
  return (
    <View style={containerStyles}>
      <SettingsItem
        leftContent={leftContent}
        rightContent={rightContent}
        title={country.name}
        subtitle={country.language}
      />
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
