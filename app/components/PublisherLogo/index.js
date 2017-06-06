import React, { PropTypes } from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

const PublisherLogo = ({skin, size, source}) => {
  const logoContainerStyles = () => {
    let offset = 2
    let styleArr = [styles.logoContainer, getSize(size + offset)]
    if (skin === 'dark') styleArr.push(styles.darkLogoContainerSkin)
    return styleArr
  }

  const logoStyles = () => {
    let styleArr = [styles.logo, getSize(size)]
    if (skin === 'dark') styleArr.push(styles.darkLogoSkin)
    return styleArr
  }

  const getSize = (size) => {
    return {
      width: size,
      height: size,
      borderRadius: size / 2
    }
  }

  return (
    <View style={logoContainerStyles()}>
      <Image style={logoStyles()} source={source} />
    </View>
  )
}

PublisherLogo.propTypes = {
  source: PropTypes.any,
  skin: PropTypes.string,
  size: PropTypes.number
}

PublisherLogo.defaultProps = {
  size: 22
}

export default PublisherLogo
