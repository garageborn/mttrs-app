import React, { PropTypes } from 'react'
import { View } from 'react-native'
import StatsActive from '../StatsActive'
import styles from './styles'

const StatsBar = ({ active, color, height }) => {
  const getColor = () => ({ backgroundColor: color })
  const getHeight = () => ({ height })

  const renderActive = () => {
    if (!active) return null
    return <StatsActive height={height} />
  }

  return (
    <View style={styles.container}>
      {renderActive()}
      <View style={[styles.bar, getColor(), getHeight()]} />
    </View>
  )
}

StatsBar.propTypes = {
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired
}

export default StatsBar
