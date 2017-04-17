import React, { PropTypes, Component } from 'react'
import { View, Text, Image } from 'react-native'
import { DARK_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

class StorySummary extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={this.headlineStyles}>
            <Text style={styles.headline}>{this.props.headline}</Text>
          </View>
          <Text style={this.summaryStyles}>{this.props.summary}</Text>
        </View>
      </View>
    )
  }

  get summaryStyles () {
    let summaryStyles = [styles.summary]
    if (this.props.visited) summaryStyles = [...summaryStyles, styles.summaryVisited]
    return summaryStyles
  }

  get headlineStyles () {
    if (!this.props.visited) return styles.headlineContainer
    return [styles.headlineContainer, styles.headlineVisited]
  }
}

StorySummary.propTypes = {
  visited: PropTypes.bool.isRequired,
  headline: PropTypes.string.isRequired,
  summary: PropTypes.string,
  intl: PropTypes.object
}

export default StorySummary
