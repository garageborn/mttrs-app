import React, { PropTypes, Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from '../styles/StorySummary'
import LinearGradient from 'react-native-linear-gradient'

const charsThreshold = 140

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
          <Text style={styles.summary}>{this.props.summary}</Text>
          {this.renderExpandButtonContainer()}
        </View>
      </View>
    )
  }

  renderExpandButtonContainer() {
    if (this.props.summary.length < charsThreshold) return
    return (
      <View style={styles.expandButtonContainer}>
        <LinearGradient
          colors={['rgba(241,241,241,.2)', 'rgba(241,241,241,1)']}
          style={styles.gradient} />
          {this.renderButton()}
      </View>
    )
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
      <TouchableHighlight style={styles.expandButton} onPress={() => this.props.pressExpandButton()}>
        {buttonText}
      </TouchableHighlight>
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
