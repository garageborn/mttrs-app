import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import StatsBar from '../StatsBar'
import styles from './styles'

const bars = [
  { size: 5, color: '#FFC409' },
  { size: 10, color: '#FDBB0B' },
  { size: 15, color: '#FAAC10' },
  { size: 20, color: '#F8A412' },
  { size: 25, color: '#F59A15' },
  { size: 30, color: '#F39018' },
  { size: 35, color: '#F49517' },
  { size: 40, color: '#F1891B' },
  { size: 45, color: '#EF811D' },
  { size: 50, color: '#ED7720' },
  { size: 55, color: '#EC7122' },
  { size: 60, color: '#E65A29' },
  { size: 65, color: '#E5542C' },
  { size: 70, color: '#E44F2D' },
  { size: 75, color: '#E34B2F' }
]

class StatsChart extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.chart}>
          {bars.map((bar, idx) => {
            let active = this.getActive(idx)
            return <StatsBar key={idx} active={active} height={bar.size} color={bar.color} />
          })}
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>50</Text>
          <View style={styles.labelSeparator} />
          <Text style={styles.labelText}>500K</Text>
        </View>
      </View>
    )
  }

  getActive (idx) {
    const { totalCount } = this.props
    const limit = 500000
    const nextIndex = idx + 1
    const inSegment = totalCount > (Math.round(limit / bars.length) * idx)
    const inNextSegment = totalCount > (Math.round(limit / bars.length) * nextIndex)

    return inSegment && !inNextSegment
  }
}

StatsChart.propTypes = {
  totalCount: PropTypes.number.isRequired
}

export default StatsChart
