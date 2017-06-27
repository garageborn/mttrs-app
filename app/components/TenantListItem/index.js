import React, { PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'
import mttrsBrIcon from './assets/mttrs_br.png'
import mttrsUsIcon from './assets/mttrs_us.png'

const images = {
  mttrs_br: mttrsBrIcon,
  mttrs_us: mttrsUsIcon
}

const TenantListItem = ({ active, country, rightContent }) => {
  const containerStyles = active ? styles.containerActive : styles.container
  return (
    <View style={containerStyles}>
      <View style={styles.leftContainer}>
        <Image source={images[country.tenantId]} />
        <View style={styles.itemDetails}>
          <Text style={styles.title}>
            {country.name}
          </Text>
          <Text style={styles.subtitle}>
            {country.language}
          </Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        {rightContent}
      </View>
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
