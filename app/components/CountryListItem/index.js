import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const CountryListItem = ({ active, country, rightContent }) => {
  const leftContainerStyles = active ? styles.leftContainer : styles.leftContainerInactive
  return (
    <View style={styles.container}>
      <View style={leftContainerStyles}>
        <Text style={styles.name}>
          {country.name}
        </Text>
        <Text style={styles.name}>
          {country.language}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {rightContent}
      </View>
    </View>
  )
}

CountryListItem.propTypes = {
  active: PropTypes.bool,
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }),
  rightContent: PropTypes.element
}

export default CountryListItem
