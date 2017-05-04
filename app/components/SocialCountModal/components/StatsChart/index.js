import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import KFormat from '../../../../common/utils/KFormat'
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
const lowerLimit = 1000
const higherLimit = 100000

class StatsChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: this.getActive()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.chart}>
          {bars.map((bar, idx) => {
            let active = this.state.active === idx
            return <StatsBar key={idx} active={active} height={bar.size} color={bar.color} />
          })}
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{this.lowerLabel}</Text>
          <View style={styles.labelSeparator} />
          <Text style={styles.labelText}>{this.higherLabel}</Text>
        </View>
      </View>
    )
  }

  getActive () {
    const { totalCount } = this.props

    if (totalCount >= higherLimit) return bars.length - 1
    if (totalCount <= lowerLimit) return 0

    let activeBar = bars.find ((bar, index) => {
      const minCount = Math.round(higherLimit / bars.length) * index
      const maxCount = Math.round(higherLimit / bars.length) * (index + 1)
      return totalCount >= minCount && totalCount <= maxCount
    })

    return bars.indexOf(activeBar)
  }

  get lowerLabel () {
    const { totalCount } = this.props
    const value = totalCount < lowerLimit ? totalCount : lowerLimit
    return KFormat(value)
  }

  get higherLabel () {
    const { totalCount } = this.props
    const value = totalCount > higherLimit ? totalCount : higherLimit
    return KFormat(value)
  }
}

StatsChart.propTypes = {
  totalCount: PropTypes.number.isRequired
}

export default StatsChart
