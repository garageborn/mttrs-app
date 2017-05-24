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
    const { data } = this.props
    if (data.loading) return this.renderLoader()

    return (
      <ScrollView
        ref={'scrollView'}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {this.renderDefaultTag()}
        {this.renderTags()}
      </ScrollView>
    )
  }

  renderDefaultTag () {
    const { intl, handleTag } = this.props

    return (
      <Tag active={this.isActive()} onPress={() => handleTag()}>
        {intl.formatMessage(messages.default)}
      </Tag>
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
          onPress={() => handleTag(tag.slug)}
        >
          {tag.name}
        </Tag>
      )
    })
  }

  renderLoader () {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator color='#AAA' />
      </View>
    )
  }

  isLast (idx) {
    return idx === this.props.data.tags.length - 1
  }

  isActive (slug) {
    return slug === this.props.active
  }

  handleScroll (nextProps) {
    if (this.props.data.loading) return
    if (this.props.active !== nextProps.active) return
    // return this.refs.scrollView.scrollTo({x: 0, y: 0, animated: false})
  }
}

TagsList.propTypes = {
  active: PropTypes.string,
  data: PropTypes.shape({
    tags: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired,
  handleTag: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(TagsList)
