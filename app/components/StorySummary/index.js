import React, { PropTypes, Component } from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import LinearGradient from 'react-native-linear-gradient'
import { DARK_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import iconMttrs from './assets/icon-mttrs.png'
import styles from './styles'

const charsThreshold = 200

const messages = defineMessages({
  showMore: {
    id: 'summary.showMore'
  },
  showLess: {
    id: 'summary.showLess'
  }
})

class StorySummary extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={this.boxStyles}>
          <View style={this.headlineStyles}>
            <Image style={styles.icon} source={iconMttrs} />
            <Text style={styles.headline}>{this.props.headline}</Text>
          </View>
          <Text style={this.summaryStyles}>{this.props.summary}</Text>
          {this.renderFooter()}
        </View>
      </View>
    )
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
          style={this.expandButtonStyles}
          onPress={() => this.props.pressExpandButton()}
        >
          {buttonText}
        </TouchableHighlight>
      </View>
    )
  }

  get expandButtonStyles () {
    if (!this.props.visited) return styles.expandButton
    return [styles.expandButton, styles.expandButtonVisited]
  }

  get summaryStyles () {
    let summaryStyles = [styles.summary]
    if (this.props.isExpanded) summaryStyles = [...summaryStyles, styles.summaryExpanded]
    if (this.props.visited) summaryStyles = [...summaryStyles, styles.summaryVisited]
    return summaryStyles
  }

  get headlineStyles () {
    if (!this.props.visited) return styles.headlineContainer
    return [styles.headlineContainer, styles.headlineVisited]
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
  visited: PropTypes.bool.isRequired,
  headline: PropTypes.string.isRequired,
  summary: PropTypes.string,
  isExpanded: PropTypes.bool,
  pressExpandButton: PropTypes.func,
  intl: PropTypes.object
}

export default injectIntl(StorySummary)
