/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { ScrollView } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Tag from '../Tag'
import styles from './styles'

const messages = defineMessages({
  default: {
    id: 'tags.default'
  }
})

class TagsList extends Component {
  constructor () {
    super()

    this.renderTags = this.renderTags.bind(this)
  }

  render () {
    const { intl, handleTag } = this.props
    const text = intl.formatMessage(messages.default)

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={this.containerStyles}>
        <Tag active={this.isActive()} onPress={() => handleTag()}>
          {text}
        </Tag>
        {this.renderTags()}
      </ScrollView>
    )
  }

  renderTags () {
    const { handleTag, tags } = this.props
    return tags.map((tag, idx) => {
      return (
        <Tag
          key={`tag_${idx}`}
          last={this.isLast(idx)}
          active={this.isActive(tag.slug)}
          onPress={() => handleTag(tag.slug)}
        >
          {tag.name}
        </Tag>
      )
    })
  }

  isLast (idx) {
    return idx === this.props.tags.length - 1
  }

  isActive (slug) {
    return slug == this.props.active
  }

  get containerStyles () {
    let containerStyles = styles.container
    if (this.props.menuOpen) containerStyles = [styles.container, styles.containerActive]
    return containerStyles
  }
}

TagsList.propTypes = {
  handleTag: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  active: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  menuOpen: PropTypes.bool.isRequired
}

export default injectIntl(TagsList)
