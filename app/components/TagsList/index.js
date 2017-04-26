/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
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

  componentWillReceiveProps (nextProps) {
    this.handleScroll(nextProps)
  }

  render () {
    const { intl, handleTag, data } = this.props
    const text = intl.formatMessage(messages.default)
    if (data.loading) return this.renderLoader()
    return (
      <ScrollView
        ref={'scrollView'}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={this.containerStyles}
      >
        <Tag active={this.isActive()} onPress={() => handleTag()}>
          {text}
        </Tag>
        {this.renderTags()}
      </ScrollView>
    )
  }

  renderLoader () {
    return (
      <View style={[...this.containerStyles, styles.loaderContainer]}>
        <ActivityIndicator color='#AAA' />
      </View>
    )
  }

  renderTags () {
    const { handleTag, data } = this.props
    return data.tags.map((tag, idx) => {
      return (
        <Tag
          key={`tag_${idx}`}
          last={this.isLast(idx)}
          active={this.isActive(tag.slug)}
          onPress={() => handleTag(tag.slug, tag.category.slug)}
        >
          {tag.name}
        </Tag>
      )
    })
  }

  isLast (idx) {
    return idx === this.props.data.tags.length - 1
  }

  isActive (slug) {
    return slug == this.props.active
  }

  handleScroll (nextProps) {
    if (this.props.data.loading) return
    if (this.props.active !== nextProps.active) return
    return this.refs.scrollView.scrollTo({x: 0, y: 0, animated: false})
  }

  get containerStyles () {
    if (this.props.menuOpen) return [styles.container, styles.containerActive]
    return [styles.container]
  }
}

TagsList.propTypes = {
  handleTag: PropTypes.func.isRequired,
  data: PropTypes.shape({
    tags: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired,
  active: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  menuOpen: PropTypes.bool.isRequired
}

export default injectIntl(TagsList)
