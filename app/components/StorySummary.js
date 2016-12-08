import React, { PropTypes, Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from '../styles/StorySummary'
import LinearGradient from 'react-native-linear-gradient'
import { DARK_TRANSPARENT_COLOR } from '../constants/TouchUnderlayColors'

const charsThreshold = 200

class StorySummary extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.triangleContainer}>
          <View style={styles.outerTriangle}/>
          <View style={styles.innerTriangle}/>
        </View>
        <View style={this.boxStyles}>
          <View style={styles.headlineContainer}>
            <Text>👔</Text>
            <Text style={styles.headline}>{this.props.headline.toUpperCase()}</Text>
          </View>
          <Text style={this.summaryStyles()}>{this.props.summary}</Text>
          {this.renderFooter()}
        </View>
      </View>
    )
  }

  summaryStyles() {
    if (this.props.isExpanded) return [styles.summary, styles.summaryExpanded]
    return styles.summary
  }

  renderFooter() {
    if (this.props.summary.length < charsThreshold) return
    return (
      <View style={styles.footer}>
        {this.renderLinearGradient()}
        {this.renderButton()}
      </View>
    )
  }

  renderLinearGradient() {
    if (this.props.isExpanded) return

    return <LinearGradient colors={['rgba(241,241,241,.2)', 'rgba(241,241,241,1)']} style={styles.gradient} />
  }

  renderButton() {
    let buttonText

    if (this.props.isExpanded) {
      buttonText = (
        <View style={styles.buttonTextContainer}>
          <Text>show less </Text><View style={styles.showLessTriangle} />
        </View>
      )
    } else {
      buttonText = (
        <View style={styles.buttonTextContainer}>
          <Text>show more </Text><View style={styles.showMoreTriangle} />
        </View>
      )
    }

    return (
      <View style={styles.expandButtonContainer}>
        <TouchableHighlight underlayColor={DARK_TRANSPARENT_COLOR} style={styles.expandButton} onPress={() => this.props.pressExpandButton()}>
          {buttonText}
        </TouchableHighlight>
      </View>
    )
  }

  get boxStyles() {
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

export default StorySummary
