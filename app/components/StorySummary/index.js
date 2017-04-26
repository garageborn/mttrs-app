/* eslint-disable react/jsx-no-bind */
import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

class StorySummary extends Component {
  render () {
    const { headline, summary } = this.props.story
    return (
      <View style={styles.container}>
        <Touchable underlayColor={WHITE_TRANSPARENT_COLOR} onPress={e => this.props.onPress()}>
          <View style={styles.box}>
            <View style={this.headlineStyles}>
              <Text style={styles.headline}>{headline}</Text>
            </View>
            <Text style={this.summaryStyles}>{summary}</Text>
          </View>
        </Touchable>
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
  onPress: PropTypes.func.isRequired,
  story: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired
  }).isRequired
}

export default StorySummary
