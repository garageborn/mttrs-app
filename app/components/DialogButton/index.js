import React, { Component, PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'

class DialogButton extends Component {
  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {this.props.icon}
        </View>
        <View style={styles.textContainer}>
          {this.renderMessages()}
        </View>
      </View>
    )
  }

  renderMessages () {
    return this.props.messages.map((message, idx) => {
      return <Text style={this.textStyles(idx)} key={`message_${idx}`}>{message}</Text>
    })
  }

  textStyles (idx) {
    if (idx !== 0) return [styles.text, styles.bold]
    return styles.text
  }
}

DialogButton.propTypes = {
  icon: PropTypes.element.isRequired,
  messages: PropTypes.array.isRequired
}

export default DialogButton
