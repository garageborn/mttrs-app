import React, { PropTypes, Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from '../styles/StorySummary'
import LinearGradient from 'react-native-linear-gradient'
import { DARK_TRANSPARENT_COLOR } from '../constants/TouchUnderlayColors'

const charsThreshold = 200

const messages = defineMessages({
  title: {
    id: 'summary.title'
  },
  showMore: {
    id: 'summary.showMore'
  },
  showLess: {
    id: 'summary.showLess'
  }
})

class StorySummary extends Component {
  render () {
    let { intl } = this.props
    let title = intl.formatMessage(messages.title)

    return (
      <View style={styles.container}>
        <View style={styles.triangleContainer}>
          <View style={styles.outerTriangle} />
          <View style={styles.innerTriangle} />
        </View>
        <View style={this.boxStyles}>
          <View style={styles.headlineContainer}>
            <Text>👔</Text>
            <Text style={styles.headline}>{title}</Text>
          </View>
          <Text style={this.summaryStyles()}>{this.props.summary}</Text>
          {this.renderFooter()}
        </View>
      </View>
    )
  }

  summaryStyles () {
    if (this.props.isExpanded) return [styles.summary, styles.summaryExpanded]
    return styles.summary
  }

  renderFooter () {
    if (this.props.summary.length < charsThreshold) return
    return (
      <View style={styles.footer}>
        {this.renderLinearGradient()}
        {this.renderButton()}
      </View>
    )
  }

  renderLinearGradient () {
    if (this.props.isExpanded) return

    return (
      <LinearGradient
        colors={['rgba(241,241,241,.2)', 'rgba(241,241,241,1)']}
        style={styles.gradient}
      />
    )
  }

  renderButton () {
    let buttonText

    let { intl } = this.props
    let showMore = intl.formatMessage(messages.showMore)
    let showLess = intl.formatMessage(messages.showLess)

    if (this.props.isExpanded) {
      buttonText = (
        <View style={styles.buttonTextContainer}>
          <Text>{showLess} </Text><View style={styles.showLessTriangle} />
        </View>
      )
    } else {
      buttonText = (
        <View style={styles.buttonTextContainer}>
          <Text>{showMore} </Text><View style={styles.showMoreTriangle} />
        </View>
      )
    }

    return (
      <View style={styles.expandButtonContainer}>
        <TouchableHighlight
          underlayColor={DARK_TRANSPARENT_COLOR}
          style={styles.expandButton}
          onPress={() => this.props.pressExpandButton()}
        >
          {buttonText}
        </TouchableHighlight>
      </View>
    )
  }

  get boxStyles () {
    if (this.props.summary.length > charsThreshold) {
      let expandedStyles
      if (!this.props.isExpanded) {
        expandedStyles = { height: 200, overflow: 'hidden' }
      }
      return [styles.box, expandedStyles]
    } else {
      return styles.box
    }
  }
}

StorySummary.propTypes = {
  summary: PropTypes.string,
  isExpanded: PropTypes.bool,
  pressExpandButton: PropTypes.func,
  intl: PropTypes.object
}

export default injectIntl(StorySummary)
