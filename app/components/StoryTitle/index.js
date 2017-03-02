import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

class StoryTitle extends Component {
  render () {
    return (
      <View style={this.styles}>
        <Text style={styles.title} numberOfLines={3}>{this.props.title}</Text>
      </View>
    )
  }

  get styles () {
    if (!this.props.visited) return styles.container

    return [styles.container, styles.visited]
  }
}

StoryTitle.propTypes = {
  title: PropTypes.string.isRequired,
  visited: PropTypes.bool.isRequired
}

export default StoryTitle
